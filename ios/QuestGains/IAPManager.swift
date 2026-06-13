import StoreKit

// MARK: - Product IDs
// These must match exactly what is configured in App Store Connect.
enum IAPProductID {
    static let monthly = "com.questgains.app.premium_monthly"
    static let yearly  = "com.questgains.app.premium_yearly"

    static var all: Set<String> { [monthly, yearly] }

    static func planName(for productID: String) -> String {
        productID.contains("yearly") ? "yearly" : "monthly"
    }
}

// MARK: - IAPError
enum IAPError: LocalizedError {
    case productNotFound(String)
    case verificationFailed
    case pending
    case unknown

    var errorDescription: String? {
        switch self {
        case .productNotFound(let id): return "Product '\(id)' not found in App Store."
        case .verificationFailed:      return "Purchase verification failed. Please contact support."
        case .pending:                 return "Purchase is pending parental approval."
        case .unknown:                 return "An unknown error occurred. Please try again."
        }
    }
}

// MARK: - IAPManager (StoreKit 2)
@available(iOS 15.0, *)
final class IAPManager {

    static let shared = IAPManager()

    private(set) var products: [Product] = []
    private var updateListenerTask: Task<Void, Never>?

    private init() {}

    // MARK: - Lifecycle

    /// Start listening for background/interrupted transaction updates.
    /// Call from AppDelegate.application(_:didFinishLaunchingWithOptions:)
    func startTransactionListener() {
        guard updateListenerTask == nil else { return }
        updateListenerTask = Task.detached(priority: .background) { [weak self] in
            for await result in Transaction.updates {
                await self?.handleVerificationResult(result, source: "listener")
            }
        }
    }

    func stopTransactionListener() {
        updateListenerTask?.cancel()
        updateListenerTask = nil
    }

    // MARK: - Product Loading

    func loadProducts() async throws -> [Product] {
        products = try await Product.products(for: IAPProductID.all)
        return products
    }

    // MARK: - Purchase

    func purchase(productID: String) async throws -> Transaction? {
        // Use cached products; fall back to on-demand fetch
        let product: Product
        if let cached = products.first(where: { $0.id == productID }) {
            product = cached
        } else if let fetched = try await Product.products(for: [productID]).first {
            product = fetched
        } else {
            throw IAPError.productNotFound(productID)
        }

        let result = try await product.purchase()

        switch result {
        case .success(let verification):
            let transaction = try verifyTransaction(verification)
            await transaction.finish()
            return transaction

        case .userCancelled:
            return nil

        case .pending:
            throw IAPError.pending

        @unknown default:
            throw IAPError.unknown
        }
    }

    // MARK: - Restore

    func restorePurchases() async throws -> [Transaction] {
        var restored: [Transaction] = []
        for await result in Transaction.currentEntitlements {
            if let transaction = try? verifyTransaction(result) {
                await transaction.finish()
                restored.append(transaction)
            }
        }
        return restored
    }

    // MARK: - Verification

    private func verifyTransaction<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified:
            throw IAPError.verificationFailed
        case .verified(let value):
            return value
        }
    }

    // MARK: - Internal helpers

    @MainActor
    private func notifyWebView(_ js: String) {
        QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
    }

    private func handleVerificationResult<T>(_ result: VerificationResult<T>, source: String) async {
        guard let transaction = try? verifyTransaction(result) as? Transaction else { return }
        await transaction.finish()
        let productID = transaction.productID
        await notifyWebView(
            "if(window.onIAPPurchaseSuccess){window.onIAPPurchaseSuccess('\(productID)');}"
        )
    }
}
