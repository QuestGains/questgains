// QuestGains Subscription System v2.0
// Phase II: Real Stripe checkout via Firebase Cloud Functions

// ── Module-level state ────────────────────────────────────────────────────
let _subscriptionState = {
  isPro: false,
  plan: null,
  trialStartDate: null,
  isFoundingMember: false,
  loaded: false
};

const FUNCTIONS_BASE = 'https://us-central1-questgains.cloudfunctions.net';

// ── Firebase Functions helpers ─────────────────────────────────────────────
async function callFunction(name, data) {
  const user = firebase.auth().currentUser;
  if (!user) throw new Error('Not signed in');
  const token = await user.getIdToken();
  const res = await fetch(`${FUNCTIONS_BASE}/${name}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error.message || 'Function error');
  return json.result;
}

// ── iOS Native IAP Detection ──────────────────────────────────────────────
function isNativeIOSIAP() {
  return !!(window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers['iap-purchase']);
}

// Map plan name to App Store product ID
// Note: the UI uses 'annual' and 'monthly'; 'yearly' is accepted as alias for 'annual'.
function planToProductID(plan) {
  return (plan === 'yearly' || plan === 'annual')
    ? 'com.questgains.app.pro.yearly'
    : 'com.questgains.app.pro.monthly';
}

// ── iOS IAP Bridge Setup ──────────────────────────────────────────────────
function setupIAPBridge() {
  if (!isNativeIOSIAP()) return;

  // Called by native layer on successful purchase or restored transaction
  window.onIAPPurchaseSuccess = async function(productID) {
    const uid = getUid();
    const plan = (productID || '').includes('yearly') ? 'annual' : 'monthly';
    if (uid && typeof window.activatePro === 'function') {
      await window.activatePro(uid, plan);
    }
    if (typeof window.updateHeader === 'function') window.updateHeader();
    if (typeof window.closePaywall === 'function') window.closePaywall();
    setTimeout(() => alert('\uD83C\uDF89 Welcome to QuestGains Pro! Your ' + plan + ' subscription is now active.'), 300);
  };

  // User cancelled the App Store sheet — silent, just clear any loading state
  window.onIAPCancelled = function() {
    // no-op: user intentionally dismissed, no alert needed
  };

  // Native layer reports a purchase error
  window.onIAPError = function(message) {
    console.error('[IAP] error:', message);
    alert('Purchase failed: ' + (message || 'Unknown error. Please try again.'));
  };

  // Restore found nothing
  window.onIAPRestoreEmpty = function() {
    alert('No previous QuestGains purchases found on this Apple ID.');
  };
}

// ── Upgrade flow ───────────────────────────────────────────────────────────
window.openUpgradeFlow = async function openUpgradeFlow(plan) {
  // On iOS, Apple requires native StoreKit IAP for digital subscriptions.
  // Stripe redirects are not permitted for digital goods.
  if (isNativeIOSIAP()) {
    const productID = planToProductID(plan);
    window.webkit.messageHandlers['iap-purchase'].postMessage({ productID });
    return;
  }
  // Web / Android: use Stripe checkout
  try {
    const result = await callFunction('createCheckoutSession', { plan });
    if (result?.url) {
      window.location.href = result.url;
    }
  } catch (err) {
    console.error('[subscription] openUpgradeFlow failed:', err);
    alert('Unable to start checkout. Please try again.');
  }
};

// Expose restore function (wire to a "Restore Purchases" button in the paywall UI)
window.restoreIAPPurchases = function() {
  if (!isNativeIOSIAP()) return;
  window.webkit.messageHandlers['iap-restore'].postMessage({});
};

window.openCustomerPortal = async function openCustomerPortal() {
  // ── Hard iOS guard — ALWAYS redirect to iOS Settings on native iOS builds ──
  // Use any webkit.messageHandlers presence as the iOS signal — checking
  // specifically for 'iap-purchase' can return false if StoreKit hasn't
  // initialized yet or bracket handler access fails. Any messageHandler
  // present = we are inside the native WKWebView shell.
  const isNativeIOS = !!(window.webkit && window.webkit.messageHandlers &&
    (window.webkit.messageHandlers['sign-in-with-apple'] ||
     window.webkit.messageHandlers['iap-purchase'] ||
     window.webkit.messageHandlers['open-subscriptions']));

  console.log('[subscription] openCustomerPortal: isNativeIOS=' + isNativeIOS +
    ' handlers=' + (window.webkit ? Object.keys(window.webkit.messageHandlers || {}).join(',') : 'none'));

  if (isNativeIOS) {
    // Open Apple's native subscription management screen directly via native bridge.
    // Avoids Stripe portal entirely — required for IAP-sourced subscriptions on iOS.
    try {
      window.webkit.messageHandlers['open-subscriptions'].postMessage({});
    } catch (e) {
      console.error('[subscription] open-subscriptions handler error:', e);
      // Belt-and-suspenders: handler failed, show instructions directly
      alert('To manage your QuestGains subscription, go to:

iOS Settings → [Your Name] → Subscriptions → QuestGains');
    }
    return;
  }

  // Web-only path: create Stripe portal session
  if (!window._isSavedPaidSubscriber || !window._isSavedPaidSubscriber()) {
    alert('No active paid subscription found on this account.');
    return;
  }
  try {
    const result = await callFunction('createPortalSession', {});
    if (result?.url) {
      window.location.href = result.url;
    } else {
      throw new Error('Portal session URL not returned');
    }
  } catch (err) {
    console.error('[subscription] openCustomerPortal failed:', err);
    alert('Unable to open billing portal. Please try again or contact support@questgains.app');
  }
};

// ── Firestore helpers ──────────────────────────────────────────────────────
function getDb() {
  return (typeof window.db !== 'undefined' && window.db) ? window.db : null;
}

function getUid() {
  return window.currentUserId || null;
}

// ── Load subscription state from Firestore ─────────────────────────────────
async function loadSubscriptionState(uid) {
  const db = getDb();
  if (!db || !uid) {
    _subscriptionState.loaded = true;
    return;
  }
  try {
    const doc = await db.collection('users').doc(uid).get();
    const data = doc.exists ? doc.data() : {};
    const sub = data.subscription || {};
    _subscriptionState = {
      isPro: sub.isPro === true,
      plan: sub.plan || null,
      trialStartDate: sub.trialStartDate || null,
      isFoundingMember: sub.isFoundingMember === true,
      loaded: true
    };
  } catch (err) {
    console.warn('[subscription] Failed to load subscription state:', err);
    _subscriptionState.loaded = true;
  }
  if (typeof window.updateHeader === 'function') {
    window.updateHeader();
  }
}

// ── Checkout success handler ───────────────────────────────────────────────
window.handleCheckoutReturn = async function handleCheckoutReturn() {
  const params = new URLSearchParams(window.location.search);
  const checkout = params.get('checkout');
  const plan = params.get('plan');

  if (checkout === 'success') {
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname);
    // Reload subscription state from Firestore (webhook may have already fired)
    const uid = getUid();
    if (uid) {
      await loadSubscriptionState(uid);
    }
    if (typeof window.updateHeader === 'function') window.updateHeader();
    // Show success message
    setTimeout(() => {
      alert(`🎉 Welcome to QuestGains Pro! Your ${plan || ''} subscription is now active.`);
    }, 500);
  } else if (checkout === 'cancelled') {
    window.history.replaceState({}, '', window.location.pathname);
  }
};

// ── Public API ─────────────────────────────────────────────────────────────
// Returns true ONLY for real paid subscribers (isPro from Firestore/IAP).
// Does NOT include free trial users. Use this to gate Stripe portal access.
window._isSavedPaidSubscriber = function _isSavedPaidSubscriber() {
  return _subscriptionState.isPro === true || _subscriptionState.isFoundingMember === true;
};

window.isProUser = function isProUser() {
  if (_subscriptionState.isPro) return true;
  if (_subscriptionState.isFoundingMember) return true;
  return getTrialDaysRemaining() > 0;
};

function getTrialDaysRemaining() {
  const trialStart = _subscriptionState.trialStartDate;
  if (!trialStart) return 0;
  const startMs = typeof trialStart === 'number' ? trialStart : new Date(trialStart).getTime();
  const now = Date.now();
  const elapsedDays = (now - startMs) / (1000 * 60 * 60 * 24);
  const remaining = 14 - elapsedDays;
  return remaining > 0 ? Math.ceil(remaining) : 0;
}
window.getTrialDaysRemaining = getTrialDaysRemaining;

window.isTrialExpired = function isTrialExpired() {
  if (_subscriptionState.isPro || _subscriptionState.isFoundingMember) return false;
  const trialStart = _subscriptionState.trialStartDate;
  if (!trialStart) return false;
  return getTrialDaysRemaining() === 0;
};

window.startTrial = async function startTrial(uid) {
  if (!uid) return;
  if (_subscriptionState.trialStartDate) return;
  const db = getDb();
  if (!db) return;
  try {
    const doc = await db.collection('users').doc(uid).get();
    const data = doc.exists ? doc.data() : {};
    const existing = data?.subscription?.trialStartDate;
    if (existing) {
      _subscriptionState.trialStartDate = existing;
      return;
    }
    const now = Date.now();
    await db.collection('users').doc(uid).set(
      { subscription: { trialStartDate: now } },
      { merge: true }
    );
    _subscriptionState.trialStartDate = now;
    if (typeof window.updateHeader === 'function') window.updateHeader();
  } catch (err) {
    console.warn('[subscription] startTrial failed:', err);
  }
};

window.activatePro = async function activatePro(uid, plan) {
  if (!uid) return;
  const db = getDb();
  if (!db) return;
  try {
    const update = { isPro: true, plan };
    if (plan === 'founding') update.isFoundingMember = true;
    await db.collection('users').doc(uid).set(
      { subscription: update },
      { merge: true }
    );
    _subscriptionState.isPro = true;
    _subscriptionState.plan = plan;
    if (plan === 'founding') _subscriptionState.isFoundingMember = true;
    if (typeof window.updateHeader === 'function') window.updateHeader();
  } catch (err) {
    console.warn('[subscription] activatePro failed:', err);
  }
};

window.isFoundingMember = function isFoundingMember() {
  return _subscriptionState.isFoundingMember === true;
};

window.getFoundingMemberCount = async function getFoundingMemberCount() {
  const db = getDb();
  if (!db) return 0;
  try {
    const doc = await db.collection('meta').doc('foundingMembers').get();
    return doc.exists ? (doc.data().count || 0) : 0;
  } catch (err) {
    console.warn('[subscription] getFoundingMemberCount failed:', err);
    return 0;
  }
};

// ── Paywall Modal ──────────────────────────────────────────────────────────
window.showPaywall = async function showPaywall(featureName) {
  const modal = document.getElementById('paywall-modal');
  if (!modal) return;

  const featureEl = document.getElementById('paywall-feature-name');
  const statusEl = document.getElementById('paywall-status-text');
  const foundingSection = document.getElementById('paywall-founding-section');
  const foundingCountEl = document.getElementById('paywall-founding-count');

  if (featureEl) featureEl.textContent = featureName ? `Unlock: ${featureName}` : 'Unlock all Pro features';

  const trialExpired = window.isTrialExpired();
  if (statusEl) {
    statusEl.textContent = trialExpired ? 'Your trial has expired' : "You're on the Free plan";
  }

  // Reset to annual (best value) as default selection
  window.selectPaywallPlan('annual');

  if (foundingSection && foundingCountEl) {
    const count = await window.getFoundingMemberCount();
    const slotsLeft = Math.max(0, 500 - count);
    if (slotsLeft > 0) {
      foundingSection.classList.remove('hidden');
      foundingCountEl.textContent = `Only ${slotsLeft} founding member spots remaining!`;
    } else {
      foundingSection.classList.add('hidden');
    }
  }

  modal.classList.remove('hidden');
};

window.closePaywall = function closePaywall() {
  const modal = document.getElementById('paywall-modal');
  if (modal) modal.classList.add('hidden');
};

// ── Paywall plan selection ─────────────────────────────────────────────────
// Tracks the currently highlighted plan in the paywall modal.
let _paywallSelectedPlan = 'annual';

window.selectPaywallPlan = function selectPaywallPlan(plan) {
  _paywallSelectedPlan = plan;
  // Update card borders
  ['monthly', 'annual', 'founding'].forEach(p => {
    const el = document.getElementById('paywall-plan-' + p);
    if (!el) return;
    el.classList.toggle('border-green-500', p === plan);
    el.classList.toggle('border-yellow-500', p === plan && p === 'founding');
    el.classList.toggle('border-transparent', p !== plan);
  });
  // Update CTA label
  const btn = document.getElementById('paywall-cta-btn');
  if (btn) {
    if (plan === 'annual')   btn.textContent = 'Subscribe Annual — $39.99/yr';
    else if (plan === 'founding') btn.textContent = 'Join as Founding Member — $2.99/mo';
    else                     btn.textContent = 'Subscribe Monthly — $4.99/mo';
  }
};

// Called by the paywall CTA button
window.paywallPurchase = function paywallPurchase() {
  window.openUpgradeFlow(_paywallSelectedPlan);
};

// ── Init ──────────────────────────────────────────────────────────────────
window.initSubscription = async function initSubscription(uid) {
  _subscriptionState = {
    isPro: false,
    plan: null,
    trialStartDate: null,
    isFoundingMember: false,
    loaded: false
  };
  // Set up native iOS IAP bridge callbacks (safe to call multiple times)
  setupIAPBridge();
  await loadSubscriptionState(uid);
  // Handle Stripe redirect return (web/Android only; no-op on iOS)
  if (!isNativeIOSIAP()) {
    await window.handleCheckoutReturn();
  }
};
