import UIKit
import AuthenticationServices
import Security

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

// MARK: - Sign In With Apple Manager

class AppleSignInManager: NSObject {

    static let shared = AppleSignInManager()
    static let userIdentifierKey = "appleSignInUserIdentifier"

    // Must be strong — ASAuthorizationController is NOT retained by the system on iOS 26+.
    // If this goes out of scope, the controller is deallocated and the delegate never fires.
    private var authorizationController: ASAuthorizationController?

    // Strong reference so it is never nil when the presentation anchor is requested.
    private var presentationAnchorWindow: ASPresentationAnchor?
    var completion: ((Result<[String: String], Error>) -> Void)?

    // MARK: - Trigger Sign In

    func signIn(from viewController: UIViewController, completion: @escaping (Result<[String: String], Error>) -> Void) {
        // Capture the window strongly so it cannot disappear before the sheet is presented.
        self.presentationAnchorWindow = viewController.view.window ?? {
            let foregroundScene = UIApplication.shared.connectedScenes
                .compactMap { $0 as? UIWindowScene }
                .first { $0.activationState == .foregroundActive }
            return foregroundScene?.windows.first(where: { $0.isKeyWindow })
                ?? foregroundScene?.windows.first
        }()
        self.completion = completion

        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.fullName, .email]

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
        var result: [String: String] = ["userIdentifier": userIdentifier]

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
        if authError?.code == .canceled {
            print("AppleSignIn: user cancelled")
        } else {
            print("AppleSignIn: error — \(error.localizedDescription)")
        }
        DispatchQueue.main.async {
            self.completion?(.failure(error))
        }
    }
}

// MARK: - ASAuthorizationControllerPresentationContextProviding

extension AppleSignInManager: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        // Return the strongly-held window captured at sign-in time.
        if let anchor = presentationAnchorWindow {
            return anchor
        }
        // iOS 15+ / iPadOS 26+ compatible: use connectedScenes instead of deprecated .windows
        let foregroundScene = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first { $0.activationState == .foregroundActive }
        if let keyWindow = foregroundScene?.windows.first(where: { $0.isKeyWindow }) {
            return keyWindow
        }
        if let anyWindow = foregroundScene?.windows.first {
            return anyWindow
        }
        // Final fallback: any connected scene
        let anyScene = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first
        return anyScene?.windows.first ?? UIWindow()
    }
}
