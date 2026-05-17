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

// ── Upgrade flow ───────────────────────────────────────────────────────────
window.openUpgradeFlow = async function openUpgradeFlow(plan) {
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

window.openCustomerPortal = async function openCustomerPortal() {
  try {
    const result = await callFunction('createPortalSession', {});
    if (result?.url) {
      window.location.href = result.url;
    }
  } catch (err) {
    console.error('[subscription] openCustomerPortal failed:', err);
    alert('Unable to open billing portal. Please try again.');
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
  const ctaEl = document.getElementById('paywall-cta-btn');
  const foundingSection = document.getElementById('paywall-founding-section');
  const foundingCountEl = document.getElementById('paywall-founding-count');

  if (featureEl) featureEl.textContent = featureName;

  const trialStarted = !!_subscriptionState.trialStartDate;
  const trialExpired = window.isTrialExpired();

  if (statusEl) {
    statusEl.textContent = trialExpired ? "Your trial has expired" : "You're on the Free plan";
  }

  if (ctaEl) {
    if (!trialStarted) {
      ctaEl.textContent = '🎉 Start 14-Day Free Trial';
      ctaEl.onclick = async () => {
        const uid = getUid();
        if (uid) await window.startTrial(uid);
        closePaywall();
        if (typeof window.updateHeader === 'function') window.updateHeader();
        alert('Your 14-day Pro trial has started! Enjoy full access.');
      };
    } else {
      ctaEl.textContent = 'Upgrade to Pro — $4.99/mo';
      ctaEl.onclick = () => {
        closePaywall();
        window.openUpgradeFlow('monthly');
      };
    }
  }

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

// ── Init ──────────────────────────────────────────────────────────────────
window.initSubscription = async function initSubscription(uid) {
  _subscriptionState = {
    isPro: false,
    plan: null,
    trialStartDate: null,
    isFoundingMember: false,
    loaded: false
  };
  await loadSubscriptionState(uid);
  // Handle Stripe redirect return
  await window.handleCheckoutReturn();
};
