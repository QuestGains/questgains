import UIKit
import AuthenticationServices
import Security
import CryptoKit

// MARK: - Keychain Helper

enum KeychainError: Error {
    case unhandledError(status: OSStatus)
    case itemNotFound
}

struct KeychainHelper {

    static let service = Bundle.main.bundleIdentifier ?? "com.questgains.app"

    static func save(key: String, value: String) throws {
        guard let data = value.data(using: .utf8) else { return }

        let query: [CFString: Any] = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: service,
            kSecAttrAccount: key
        ]

        // Delete any existing item first
        SecItemDelete(query as CFDictionary)

        var attributes = query
        attributes[kSecValueData] = data

        let status = SecItemAdd(attributes as CFDictionary, nil)
        guard status == errSecSuccess else {
            throw KeychainError.unhandledError(status: status)
        }
    }

    static func load(key: String) throws -> String {
        let query: [CFString: Any] = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: service,
            kSecAttrAccount: key,
            kSecReturnData: true,
            kSecMatchLimit: kSecMatchLimitOne
        ]

        var item: CFTypeRef?
        let status = SecItemCopyMatching(query as CFDictionary, &item)

        guard status == errSecSuccess else {
            if status == errSecItemNotFound {
                throw KeychainError.itemNotFound
            }
            throw KeychainError.unhandledError(status: status)
        }

        guard let data = item as? Data,
              let value = String(data: data, encoding: .utf8) else {
            throw KeychainError.itemNotFound
        }
        return value
    }

    static func delete(key: String) {
        let query: [CFString: Any] = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: service,
            kSecAttrAccount: key
        ]
        SecItemDelete(query as CFDictionary)
    }
}

// MARK: - Nonce Helpers (required by Firebase Apple Sign-In)

/// Generates a cryptographically random nonce string.
private func randomNonceString(length: Int = 32) -> String {
    precondition(length > 0)
    var randomBytes = [UInt8](repeating: 0, count: length)
    let errorCode = SecRandomCopyBytes(kSecRandomDefault, randomBytes.count, &randomBytes)
    if errorCode != errSecSuccess {
        fatalError("Unable to generate nonce — SecRandomCopyBytes failed with OSStatus \(errorCode)")
    }
    let charset: [Character] = Array("0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._")
    let nonce = randomBytes.map { byte in
        charset[Int(byte) % charset.count]
    }
    return String(nonce)
}

/// Returns the SHA256 hex digest of a string (for passing to ASAuthorizationAppleIDRequest.nonce).
@available(iOS 13.0, *)
private func sha256(_ input: String) -> String {
    let inputData = Data(input.utf8)
    let hashed = SHA256.hash(data: inputData)
    return hashed.compactMap { String(format: "%02x", $0) }.joined()
}

// MARK: - Sign In With Apple Manager

class AppleSignInManager: NSObject {

    static let shared = AppleSignInManager()
    static let userIdentifierKey = "appleSignInUserIdentifier"

    // Raw nonce generated before each sign-in request.
    // Must be passed to Firebase credential to prove the request originates from this app.
    private var currentNonce: String?

    // Must be strong — ASAuthorizationController is NOT retained by the system on iOS 26+.
    // If this goes out of scope, the controller is deallocated and the delegate never fires.
    private var authorizationController: ASAuthorizationController?

    // Strong reference so it is never nil when the presentation anchor is requested.
    private var presentationAnchorWindow: ASPresentationAnchor?
    var completion: ((Result<[String: String], Error>) -> Void)?

    // MARK: - Trigger Sign In

    func signIn(from viewController: UIViewController, completion: @escaping (Result<[String: String], Error>) -> Void) {
        // Capture the window strongly so it cannot disappear before the sheet is presented.
        // On iPadOS 26+ / Stage Manager, prefer UIWindowScene.keyWindow (iOS 15+) over
        // the deprecated UIWindow.isKeyWindow approach.
        // Capture the window, iterating scenes defensively for all iPad models
        // (Air M3, M4, Stage Manager, split-view, background scenes).
        let allScenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        // Break the ?? chain into explicit steps — the Swift type checker times out on
        // long nil-coalescing chains in a single expression (SE-0232 / SR-5719).
        func firstWindow(in states: [UIScene.ActivationState]) -> UIWindow? {
            for state in states {
                if let w = allScenes.first(where: { $0.activationState == state })?.keyWindow { return w }
                if let w = allScenes.first(where: { $0.activationState == state })?.windows.first { return w }
            }
            return nil
        }
        var capturedWindow: UIWindow? = viewController.view.window
        if capturedWindow == nil { capturedWindow = viewController.view.window?.windowScene?.keyWindow }
        if capturedWindow == nil { capturedWindow = firstWindow(in: [.foregroundActive, .foregroundInactive, .background]) }
        if capturedWindow == nil { capturedWindow = allScenes.first?.keyWindow ?? allScenes.first?.windows.first }
        self.presentationAnchorWindow = capturedWindow
        print("[SIWA] signIn: captured window=\(String(describing: self.presentationAnchorWindow)), scene state=\(String(describing: self.presentationAnchorWindow?.windowScene?.activationState.rawValue))")
        self.completion = completion

        // Generate nonce — must be set before performRequests() and passed to Firebase
        let rawNonce = randomNonceString()
        currentNonce = rawNonce
        let hashedNonce: String
        if #available(iOS 13.0, *) {
            hashedNonce = sha256(rawNonce)
        } else {
            hashedNonce = rawNonce
        }

        // Diagnostic: confirm nonce generation — first 8 chars visible in Xcode/Console
        print("[SIWA-nonce] raw nonce (first 8): \(rawNonce.prefix(8))")
        print("[SIWA-nonce] SHA256 hash (first 8): \(hashedNonce.prefix(8))")
        print("[SIWA-nonce] nonce length: \(rawNonce.count), hash length: \(hashedNonce.count)")

        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.fullName, .email]
        request.nonce = hashedNonce
        print("[SIWA-nonce] request.nonce set — proceeding to performRequests()")

        // Store the controller as a property — local variables are deallocated immediately
        // after this method returns, which silently kills the auth flow on iOS 26+.
        let controller = ASAuthorizationController(authorizationRequests: [request])
        controller.delegate = self
        controller.presentationContextProvider = self
        self.authorizationController = controller
        controller.performRequests()
    }

    // MARK: - Credential State Check (call on app launch)

    static func checkCredentialState(completion: @escaping (ASAuthorizationAppleIDProvider.CredentialState) -> Void) {
        guard let userIdentifier = try? KeychainHelper.load(key: userIdentifierKey) else {
            // No stored user — nothing to check
            completion(.notFound)
            return
        }

        ASAuthorizationAppleIDProvider().getCredentialState(forUserID: userIdentifier) { state, error in
            DispatchQueue.main.async {
                if let error = error {
                    print("AppleSignIn: credential state error — \(error.localizedDescription)")
                    completion(.notFound)
                    return
                }
                switch state {
                case .authorized:
                    print("AppleSignIn: credential still valid")
                case .revoked:
                    print("AppleSignIn: credential revoked — clearing stored user")
                    KeychainHelper.delete(key: userIdentifierKey)
                    // Notify the WebView so it can sign the user out
                    DispatchQueue.main.async {
                        QuestGains.webView?.evaluateJavaScript(
                            "if(window.onAppleSignInRevoked){window.onAppleSignInRevoked();}", completionHandler: nil)
                    }
                case .transferred:
                    print("AppleSignIn: credential transferred — update userIdentifier via re-authentication")
                    KeychainHelper.delete(key: userIdentifierKey)
                default:
                    break
                }
                completion(state)
            }
        }
    }
}

// MARK: - ASAuthorizationControllerDelegate

extension AppleSignInManager: ASAuthorizationControllerDelegate {

    func authorizationController(controller: ASAuthorizationController,
                                 didCompleteWithAuthorization authorization: ASAuthorization) {
        // Release the retained controller now that we have a result.
        defer { self.authorizationController = nil }

        guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential else {
            DispatchQueue.main.async {
                self.completion?(.failure(NSError(domain: "AppleSignIn", code: -1,
                                            userInfo: [NSLocalizedDescriptionKey: "Unexpected credential type"])))
            }
            return
        }

        let userIdentifier = credential.user

        // Persist userIdentifier securely in Keychain
        do {
            try KeychainHelper.save(key: AppleSignInManager.userIdentifierKey, value: userIdentifier)
        } catch {
            print("AppleSignIn: Keychain save failed — \(error)")
        }

        // Build result dict for the WebView
        // Include the raw nonce so JS can pass it to Firebase OAuthProvider.credential()
        var result: [String: String] = ["userIdentifier": userIdentifier]
        if let nonce = self.currentNonce {
            result["rawNonce"] = nonce
            print("[SIWA-nonce] rawNonce included in payload (first 8): \(nonce.prefix(8))")
        } else {
            print("[SIWA-nonce] WARNING: currentNonce is nil — rawNonce will NOT be in payload!")
        }

        if let email = credential.email {
            result["email"] = email
        }
        if let fullName = credential.fullName {
            var nameParts: [String] = []
            if let given = fullName.givenName { nameParts.append(given) }
            if let family = fullName.familyName { nameParts.append(family) }
            let name = nameParts.joined(separator: " ")
            if !name.isEmpty { result["fullName"] = name }
        }
        if let identityToken = credential.identityToken,
           let tokenString = String(data: identityToken, encoding: .utf8) {
            result["identityToken"] = tokenString
            print("[SIWA-nonce] identityToken included, length: \(tokenString.count)")
        } else {
            print("[SIWA-nonce] WARNING: identityToken is nil or not UTF-8 encodable!")
        }
        if let authCode = credential.authorizationCode,
           let codeString = String(data: authCode, encoding: .utf8) {
            result["authorizationCode"] = codeString
        }

        // Always deliver the result on the main thread — ASAuthorizationController can
        // call its delegate on a background thread, which would cause evaluateJavaScript
        // to silently fail on iOS 26.
        DispatchQueue.main.async {
            self.completion?(.success(result))
        }
    }

    func authorizationController(controller: ASAuthorizationController,
                                 didCompleteWithError error: Error) {
        defer { self.authorizationController = nil }
        let authError = error as? ASAuthorizationError
        let code = authError?.code.rawValue ?? -9999
        let desc = error.localizedDescription
        if authError?.code == .canceled {
            print("[SIWA] user cancelled (code=\(code))")
            // Cancellation is intentional — do not fire onAppleSignInError to the WebView.
            DispatchQueue.main.async { self.completion?(.failure(error)) }
            return
        }
        // Non-cancel error: log everything and send back to WebView for display/debugging.
        let errorMessage = "ASAuthorizationError code=\(code) — \(desc)"
        print("[SIWA] didCompleteWithError: \(errorMessage)")
        // Additional diagnostics for the most common iPad-specific failure modes.
        if authError?.code == .failed {
            print("[SIWA] code=failed — possible causes: entitlement missing in provisioning profile, " +
                  "ASAuthorizationController deallocated before delegate fired, or incorrect bundle ID.")
        } else if authError?.code == .invalidResponse {
            print("[SIWA] code=invalidResponse — Apple ID server returned an unexpected response.")
        } else if authError?.code == .notHandled {
            print("[SIWA] code=notHandled — request not handled; check entitlement in embedded profile.")
        } else if authError?.code == .unknown {
            print("[SIWA] code=unknown — check that com.apple.developer.applesignin entitlement " +
                  "is present in the built binary and the provisioning profile.")
        }
        DispatchQueue.main.async {
            self.completion?(.failure(error))
            // Fire error description back to WebView so it can display a user-facing message
            // and so the error appears in the JS console for review submissions.
            let escaped = errorMessage
                .replacingOccurrences(of: "\\", with: "\\\\")
                .replacingOccurrences(of: "'", with: "\\'")
            QuestGains.webView?.evaluateJavaScript(
                "if(typeof window.onAppleSignInError==='function'){window.onAppleSignInError('\(escaped)');}" +
                "console.error('[SIWA-native] \(escaped)');",
                completionHandler: { _, evalErr in
                    if let evalErr = evalErr {
                        print("[SIWA] evaluateJavaScript onAppleSignInError failed: \(evalErr)")
                    }
                }
            )
        }
    }
}

// MARK: - ASAuthorizationControllerPresentationContextProviding

extension AppleSignInManager: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        // Return the strongly-held window captured at sign-in time.
        if let anchor = presentationAnchorWindow {
            print("[SIWA] presentationAnchor: using captured window")
            return anchor
        }
        // Defensive fallback: iterate ALL connected window scenes across all
        // activation states. Covers iPad Air M3, M4, Stage Manager, and split-view.
        // Priority: foregroundActive > foregroundInactive > background > any scene.
        let allScenes = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
        let targetScene = allScenes.first { $0.activationState == .foregroundActive }
                       ?? allScenes.first { $0.activationState == .foregroundInactive }
                       ?? allScenes.first { $0.activationState == .background }
                       ?? allScenes.first
        // keyWindow is the preferred iOS 15+ API; fall back through all windows
        if let window = targetScene?.keyWindow ?? targetScene?.windows.first(where: { $0.isKeyWindow }) ?? targetScene?.windows.first {
            print("[SIWA] presentationAnchor: found window via scene (state=\(targetScene?.activationState.rawValue ?? -1))")
            return window
        }
        // Last resort: search all windows across all scenes
        for scene in allScenes {
            if let window = scene.keyWindow ?? scene.windows.first {
                print("[SIWA] presentationAnchor: fallback to scene \(scene.activationState.rawValue) window")
                return window
            }
        }
        print("[SIWA] presentationAnchor: no window found — returning empty UIWindow (last resort)")
        return UIWindow()
    }
}
