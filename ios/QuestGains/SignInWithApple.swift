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

    private weak var presentationAnchor: ASPresentationAnchor?
    var completion: ((Result<[String: String], Error>) -> Void)?

    // MARK: - Trigger Sign In

    func signIn(from viewController: UIViewController, completion: @escaping (Result<[String: String], Error>) -> Void) {
        self.presentationAnchor = viewController.view.window
        self.completion = completion

        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.fullName, .email]

        let controller = ASAuthorizationController(authorizationRequests: [request])
        controller.delegate = self
        controller.presentationContextProvider = self
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
        guard let credential = authorization.credential as? ASAuthorizationAppleIDCredential else {
            completion?(.failure(NSError(domain: "AppleSignIn", code: -1,
                                        userInfo: [NSLocalizedDescriptionKey: "Unexpected credential type"])))
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

        completion?(.success(result))
    }

    func authorizationController(controller: ASAuthorizationController,
                                 didCompleteWithError error: Error) {
        let authError = error as? ASAuthorizationError
        if authError?.code == .canceled {
            print("AppleSignIn: user cancelled")
        } else {
            print("AppleSignIn: error — \(error.localizedDescription)")
        }
        completion?(.failure(error))
    }
}

// MARK: - ASAuthorizationControllerPresentationContextProviding

extension AppleSignInManager: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        if let anchor = presentationAnchor {
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
