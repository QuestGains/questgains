import UIKit
import WebKit
import AuthenticationServices

var webView: WKWebView! = nil

class ViewController: UIViewController, WKNavigationDelegate, UIDocumentInteractionControllerDelegate {
    enum LoadingMode {
        case defaultCachePolicy
        case forceCache
    }

    var documentController: UIDocumentInteractionController?
    func documentInteractionControllerViewControllerForPreview(_ controller: UIDocumentInteractionController) -> UIViewController {
        return self
    }
    
    @IBOutlet weak var loadingView: UIView!
    @IBOutlet weak var progressView: UIProgressView!
    @IBOutlet weak var connectionProblemView: UIImageView!
    @IBOutlet weak var webviewView: UIView!
    var toolbarView: UIToolbar!
    
    var htmlIsLoaded = false;
    private var loadingMode = LoadingMode.defaultCachePolicy
    private var loadTimeoutTimer: Timer?
    private var retryButton: UIButton?
    
    private var themeObservation: NSKeyValueObservation?
    var currentWebViewTheme: UIUserInterfaceStyle = .unspecified
    override var preferredStatusBarStyle : UIStatusBarStyle {
        if #available(iOS 13, *), overrideStatusBar{
            if #available(iOS 15, *) {
                return .default
            } else {
                return statusBarTheme == "dark" ? .lightContent : .darkContent
            }
        }
        return .default
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        initWebView()
        initToolbarView()
        // Force-bypass cache on every launch — GitHub Pages JS is always fetched fresh.
        loadRootUrl(cachePolicy: .reloadIgnoringLocalAndRemoteCacheData)
    
        NotificationCenter.default.addObserver(self, selector: #selector(self.keyboardWillHide(_:)), name: UIResponder.keyboardWillHideNotification , object: nil)

        addRetryButton()
    }

    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        // Frame is managed by Auto Layout constraints set in initWebView().
        // calcWebviewFrame() removed — it was double-offsetting statusBarHeight on iPad.
    }
    
    @objc func keyboardWillHide(_ notification: NSNotification) {
        QuestGains.webView.setNeedsLayout()
    }
    
    func initWebView() {
        QuestGains.webView = createWebView(container: webviewView, WKSMH: self, WKND: self, NSO: self, VC: self)
        webviewView.addSubview(QuestGains.webView);
        
        // Auto Layout constraints — WebView always fills its container exactly.
        // This replaces the manual calcWebviewFrame() call that caused touch
        // unresponsiveness on iPad Air M3 / iPadOS 26 by double-counting statusBarHeight.
        NSLayoutConstraint.activate([
            QuestGains.webView.topAnchor.constraint(equalTo: webviewView.topAnchor),
            QuestGains.webView.bottomAnchor.constraint(equalTo: webviewView.bottomAnchor),
            QuestGains.webView.leadingAnchor.constraint(equalTo: webviewView.leadingAnchor),
            QuestGains.webView.trailingAnchor.constraint(equalTo: webviewView.trailingAnchor)
        ])
        
        QuestGains.webView.uiDelegate = self;
        
        QuestGains.webView.addObserver(self, forKeyPath: #keyPath(WKWebView.estimatedProgress), options: .new, context: nil)

        if(pullToRefresh){
            let refreshControl = UIRefreshControl()
            refreshControl.addTarget(self, action: #selector(refreshWebView(_:)), for: UIControl.Event.valueChanged)
            QuestGains.webView.scrollView.addSubview(refreshControl)
            QuestGains.webView.scrollView.bounces = true
        }

        if #available(iOS 15.0, *), adaptiveUIStyle {
            themeObservation = QuestGains.webView.observe(\.themeColor) { [unowned self] webView, _ in
                let backgroundColor = QuestGains.webView.underPageBackgroundColor;
                let themeColor = QuestGains.webView.themeColor;
                currentWebViewTheme = themeColor?.isLight() ?? backgroundColor?.isLight() ?? true ? .light : .dark
                self.overrideUIStyle()
                view.backgroundColor = themeColor ?? backgroundColor;
            }
        }
    }

    @objc func refreshWebView(_ sender: UIRefreshControl) {
        QuestGains.webView?.reload()
        sender.endRefreshing()
    }

    func createToolbarView() -> UIToolbar{
        let windowScene = UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .first(where: { $0.activationState == .foregroundActive })
            ?? UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.first
        var statusBarHeight = windowScene?.statusBarManager?.statusBarFrame.height ?? 60
        
        #if targetEnvironment(macCatalyst)
        if (statusBarHeight == 0){
            statusBarHeight = 30
        }
        #endif
        
        let toolbarView = UIToolbar(frame: CGRect(x: 0, y: 0, width: webviewView.frame.width, height: 0))
        toolbarView.sizeToFit()
        toolbarView.frame = CGRect(x: 0, y: 0, width: webviewView.frame.width, height: toolbarView.frame.height + statusBarHeight)
//        toolbarView.autoresizingMask = [.flexibleTopMargin, .flexibleRightMargin, .flexibleWidth]
        
        let flex = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: nil, action: nil)
        let close = UIBarButtonItem(barButtonSystemItem: .done, target: self, action: #selector(loadRootUrl))
        toolbarView.setItems([close,flex], animated: true)
        
        toolbarView.isHidden = true
        
        return toolbarView
    }
    
    func overrideUIStyle(toDefault: Bool = false) {
        if #available(iOS 15.0, *), adaptiveUIStyle {
            if (((htmlIsLoaded && !QuestGains.webView.isHidden) || toDefault) && self.currentWebViewTheme != .unspecified) {
                UIApplication
                    .shared
                    .connectedScenes
                    .flatMap { ($0 as? UIWindowScene)?.windows ?? [] }
                    .first { $0.isKeyWindow }?.overrideUserInterfaceStyle = toDefault ? .unspecified : self.currentWebViewTheme;
            }
        }
    }
    
    func initToolbarView() {
        toolbarView =  createToolbarView()
        
        webviewView.addSubview(toolbarView)
    }
    
    @objc func loadRootUrl(cachePolicy: NSURLRequest.CachePolicy = .useProtocolCachePolicy) {
        startLoadTimeout()
        // Append timestamp query string to bust any disk/memory cache on every load.
        // deepLink targets (universal/shortcut links) load as-is; only rootUrl gets cb=.
        let targetUrl: URL
        if let deepLink = SceneDelegate.universalLinkToLaunch ?? SceneDelegate.shortcutLinkToLaunch {
            targetUrl = deepLink
        } else {
            let ts = Int(Date().timeIntervalSince1970)
            targetUrl = URL(string: "\(rootUrl.absoluteString)?cb=\(ts)") ?? rootUrl
        }
        QuestGains.webView.load(URLRequest(url: targetUrl, cachePolicy: cachePolicy))
    }

    private func addRetryButton() {
        let btn = UIButton(type: .system)
        btn.setTitle("Retry", for: .normal)
        btn.titleLabel?.font = UIFont.systemFont(ofSize: 17, weight: .semibold)
        btn.backgroundColor = UIColor.systemBlue
        btn.setTitleColor(.white, for: .normal)
        btn.layer.cornerRadius = 10
        btn.clipsToBounds = true
        btn.addTarget(self, action: #selector(retryButtonTapped), for: .touchUpInside)
        btn.isHidden = true
        btn.translatesAutoresizingMaskIntoConstraints = false
        loadingView.addSubview(btn)
        NSLayoutConstraint.activate([
            btn.centerXAnchor.constraint(equalTo: loadingView.centerXAnchor),
            btn.centerYAnchor.constraint(equalTo: loadingView.centerYAnchor, constant: 60),
            btn.widthAnchor.constraint(equalToConstant: 140),
            btn.heightAnchor.constraint(equalToConstant: 44)
        ])
        retryButton = btn
    }

    @objc private func retryButtonTapped() {
        retryButton?.isHidden = true
        loadingMode = .defaultCachePolicy
        reloadWebview()
    }

    private func startLoadTimeout() {
        loadTimeoutTimer?.invalidate()
        loadTimeoutTimer = Timer.scheduledTimer(withTimeInterval: 10.0, repeats: false) { [weak self] _ in
            guard let self = self, !self.htmlIsLoaded else { return }
            // WebView hasn't finished loading in 10s — show retry
            self.animateConnectionProblem(true)
            self.retryButton?.isHidden = false
            self.setProgress(0.0, false)
        }
    }

    private func cancelLoadTimeout() {
        loadTimeoutTimer?.invalidate()
        loadTimeoutTimer = nil
    }
    
    func reloadWebview(
        loadingMode: LoadingMode = LoadingMode.defaultCachePolicy
    ) {
        switch loadingMode {
        case LoadingMode.defaultCachePolicy:
            loadRootUrl(cachePolicy: .reloadIgnoringLocalAndRemoteCacheData);

        case LoadingMode.forceCache:
            loadRootUrl(cachePolicy: .reloadIgnoringLocalAndRemoteCacheData);
        }

        self.loadingMode = loadingMode
    }
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!){
        cancelLoadTimeout()
        htmlIsLoaded = true

        self.setProgress(1.0, true)
        self.animateConnectionProblem(false)
        self.retryButton?.isHidden = true

        // Build 76 — Force SW update + purge all non-current caches from page side
        webView.evaluateJavaScript("""
            (function() {
                var CURRENT = 'questgains-v24';
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(regs) {
                        regs.forEach(function(reg) { reg.update(); });
                    });
                }
                caches.keys().then(function(keys) {
                    keys.forEach(function(k) {
                        if (k !== CURRENT) {
                            console.log('[page] purging stale cache:', k);
                            caches.delete(k);
                        }
                    });
                });
            })();
        """, completionHandler: nil)

        // Build 75 — SW diagnostic alert: show active caches + controlling SW URL
        webView.evaluateJavaScript("""
            Promise.all([
                caches.keys(),
                Promise.resolve(navigator.serviceWorker.controller ? navigator.serviceWorker.controller.scriptURL : 'no SW')
            ]).then(function(results) {
                var cacheList = results[0].join(', ') || '(none)';
                var swUrl = results[1];
                window.__swDiagnostic = 'Caches: ' + cacheList + '\\nSW: ' + swUrl;
            });
        """, completionHandler: nil)

        DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
            webView.evaluateJavaScript("window.__swDiagnostic || 'diagnostic not ready'") { result, _ in
                let msg = result as? String ?? "(no result)"
                DispatchQueue.main.async {
                    let alert = UIAlertController(title: "SW Diagnostic (Build 75)", message: msg, preferredStyle: .alert)
                    alert.addAction(UIAlertAction(title: "OK", style: .default))
                    self.present(alert, animated: true)
                }
            }
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 0.8) {
            QuestGains.webView.isHidden = false
            self.loadingView.isHidden = true
           
            self.setProgress(0.0, false)
            
            self.overrideUIStyle()
        }
    }
    
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        cancelLoadTimeout()
        htmlIsLoaded = false

        if (error as NSError)._code == (-999) { return }
        if (error as NSError)._code == 102 { return }

        self.overrideUIStyle(toDefault: true)
        webView.isHidden = true
        loadingView.isHidden = false

        animateConnectionProblem(true)
        retryButton?.isHidden = false
        setProgress(0.0, false)
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        cancelLoadTimeout()
        htmlIsLoaded = false

        if (error as NSError)._code == (-999) { return }

        self.overrideUIStyle(toDefault: true)
        webView.isHidden = true
        loadingView.isHidden = false

        animateConnectionProblem(true)
        retryButton?.isHidden = false
        setProgress(0.0, false)
    }
    
    override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {

        if (keyPath == #keyPath(WKWebView.estimatedProgress) &&
                QuestGains.webView.isLoading &&
                !self.loadingView.isHidden &&
                !self.htmlIsLoaded) {
                    var progress = Float(QuestGains.webView.estimatedProgress);
                    
                    if (progress >= 0.8) { progress = 1.0; };
                    if (progress >= 0.3) { self.animateConnectionProblem(false); }
                    
                    self.setProgress(progress, true);
        }
    }
    
    func setProgress(_ progress: Float, _ animated: Bool) {
        self.progressView.setProgress(progress, animated: animated);
    }
    
    
    func animateConnectionProblem(_ show: Bool) {
        if (show) {
            self.connectionProblemView.isHidden = false;
            self.connectionProblemView.alpha = 0
            UIView.animate(withDuration: 0.7, delay: 0, options: [.repeat, .autoreverse], animations: {
                self.connectionProblemView.alpha = 1
            })
        }
        else {
            UIView.animate(withDuration: 0.3, delay: 0, options: [], animations: {
                self.connectionProblemView.alpha = 0 // Here you will get the animation you want
            }, completion: { _ in
                self.connectionProblemView.isHidden = true;
                self.connectionProblemView.layer.removeAllAnimations();
            })
        }
    }
        
    deinit {
        QuestGains.webView.removeObserver(self, forKeyPath: #keyPath(WKWebView.estimatedProgress))
    }
}

extension UIColor {
    // Check if the color is light or dark, as defined by the injected lightness threshold.
    // Some people report that 0.7 is best. I suggest to find out for yourself.
    // A nil value is returned if the lightness couldn't be determined.
    func isLight(threshold: Float = 0.5) -> Bool? {
        let originalCGColor = self.cgColor

        // Now we need to convert it to the RGB colorspace. UIColor.white / UIColor.black are greyscale and not RGB.
        // If you don't do this then you will crash when accessing components index 2 below when evaluating greyscale colors.
        let RGBCGColor = originalCGColor.converted(to: CGColorSpaceCreateDeviceRGB(), intent: .defaultIntent, options: nil)
        guard let components = RGBCGColor?.components else {
            return nil
        }
        guard components.count >= 3 else {
            return nil
        }

        let brightness = Float(((components[0] * 299) + (components[1] * 587) + (components[2] * 114)) / 1000)
        return (brightness > threshold)
    }
}

extension ViewController: WKScriptMessageHandler {
  func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "print" {
            printView(webView: QuestGains.webView)
        }
        if message.name == "push-subscribe" {
            handleSubscribeTouch(message: message)
        }
        if message.name == "push-permission-request" {
            handlePushPermission()
        }
        if message.name == "push-permission-state" {
            handlePushState()
        }
        if message.name == "push-token" {
            handleFCMToken()
        }
        if message.name == "sign-in-with-apple" {
            handleAppleSignIn()
        }
        if message.name == "iap-purchase" {
            handleIAPPurchase(message: message)
        }
        if message.name == "iap-restore" {
            handleIAPRestore()
        }
        if message.name == "open-subscriptions" {
            handleOpenSubscriptions()
        }
  }

  // MARK: - Open iOS Subscription Settings

  func handleOpenSubscriptions() {
      // Layer 1: try itms-apps:// deep link to Apple Subscriptions screen.
      // Layer 2: fall back to https:// universal link (works on all devices).
      // Layer 3: always-reliable UIAlertController with instructions.
      print("[subscriptions] handleOpenSubscriptions called")

      func showFallbackAlert() {
          let alert = UIAlertController(
              title: "Manage Subscription",
              message: "To manage your QuestGains subscription:\n\nSettings → [Your Name] → Subscriptions → QuestGains",
              preferredStyle: .alert
          )
          alert.addAction(UIAlertAction(title: "OK", style: .default))
          self.present(alert, animated: true)
      }

      if let itmsURL = URL(string: "itms-apps://apps.apple.com/account/subscriptions") {
          UIApplication.shared.open(itmsURL, options: [:]) { success in
              print("[subscriptions] itms-apps:// open success=\(success)")
              if !success {
                  // Layer 2: https universal link
                  if let httpsURL = URL(string: "https://apps.apple.com/account/subscriptions") {
                      UIApplication.shared.open(httpsURL, options: [:]) { success2 in
                          print("[subscriptions] https:// open success=\(success2)")
                          if !success2 {
                              DispatchQueue.main.async { showFallbackAlert() }
                          }
                      }
                  } else {
                      DispatchQueue.main.async { showFallbackAlert() }
                  }
              }
          }
      } else {
          showFallbackAlert()
      }
  }

  // MARK: - In-App Purchase bridge (StoreKit 2)

  func handleIAPPurchase(message: WKScriptMessage) {
      guard #available(iOS 15.0, *) else {
          let js = "if(window.onIAPError){window.onIAPError('In-app purchases require iOS 15 or later.');}"
          QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
          return
      }
      // Extract productID from message body; default to monthly
      let productID: String
      if let body = message.body as? [String: Any],
         let pid = body["productID"] as? String {
          productID = pid
      } else {
          productID = IAPProductID.monthly
      }
      Task { @MainActor in
          do {
              if let transaction = try await IAPManager.shared.purchase(productID: productID) {
                  let js = "if(window.onIAPPurchaseSuccess){window.onIAPPurchaseSuccess('\(transaction.productID)');}"
                  QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
              } else {
                  // User cancelled — notify JS so spinner/loading state can be cleared
                  let js = "if(window.onIAPCancelled){window.onIAPCancelled();}"
                  QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
              }
          } catch {
              let msg = (error.localizedDescription)
                  .replacingOccurrences(of: "\\", with: "\\\\")
                  .replacingOccurrences(of: "'", with: "\\'")
              let js = "if(window.onIAPError){window.onIAPError('\(msg)');}"
              QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
          }
      }
  }

  func handleIAPRestore() {
      guard #available(iOS 15.0, *) else { return }
      Task { @MainActor in
          do {
              let transactions = try await IAPManager.shared.restorePurchases()
              if transactions.isEmpty {
                  let js = "if(window.onIAPRestoreEmpty){window.onIAPRestoreEmpty();}"
                  QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
              } else {
                  for t in transactions {
                      let js = "if(window.onIAPPurchaseSuccess){window.onIAPPurchaseSuccess('\(t.productID)');}"
                      QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
                  }
              }
          } catch {
              let msg = (error.localizedDescription)
                  .replacingOccurrences(of: "\\", with: "\\\\")
                  .replacingOccurrences(of: "'", with: "\\'")
              let js = "if(window.onIAPError){window.onIAPError('\(msg)');}"
              QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
          }
      }
  }

  // MARK: - Sign in with Apple bridge

  func handleAppleSignIn() {
      AppleSignInManager.shared.signIn(from: self) { result in
          switch result {
          case .success(let payload):
              // Serialize to JSON and deliver back to the WebView
              guard let jsonData = try? JSONSerialization.data(withJSONObject: payload),
                    let jsonString = String(data: jsonData, encoding: .utf8) else { return }
              let js = "if(window.onAppleSignIn){window.onAppleSignIn(\(jsonString));}"
              DispatchQueue.main.async {
                  QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
              }
          case .failure(let error):
              let authError = error as? ASAuthorizationError
              // Don't surface cancellation to the web layer
              if authError?.code == .canceled { return }
              let js = "if(window.onAppleSignInError){window.onAppleSignInError(\"\(error.localizedDescription)\");}"
              DispatchQueue.main.async {
                  QuestGains.webView?.evaluateJavaScript(js, completionHandler: nil)
              }
          }
      }
  }
}