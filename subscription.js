// QuestGains Subscription System v1.0
// Phase 1: UI/Logic gates — no real payment processing

// ── Module-level state (synchronous after load) ────────────────────────────
let _subscriptionState = {
  isPro: false,
  plan: null,
  trialStartDate: null,
  isFoundingMember: false,
  loaded: false
};

// ── Placeholder upgrade flow ───────────────────────────────────────────────
window.openUpgradeFlow = function openUpgradeFlow() {
  alert('💳 Payment coming soon — thank you for your interest!\n\nQuestGains Pro will be available at $4.99/mo or $39.99/yr.\nFounding Members lock in this rate forever (first 500 only).');
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
  // Re-render trial banner whenever state refreshes
  if (typeof window.updateHeader === 'function') {
    window.updateHeader();
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Returns true if the user has Pro access (paid, founding member, or active trial).
 * Synchronous after initial auth load.
 */
window.isProUser = function isProUser() {
  if (_subscriptionState.isPro) return true;
  if (_subscriptionState.isFoundingMember) return true;
  return getTrialDaysRemaining() > 0;
};

/**
 * Returns the number of trial days remaining (0 if expired or not started).
 */
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

/**
 * Returns true if the trial was started but has expired (and user is not Pro).
 */
window.isTrialExpired = function isTrialExpired() {
  if (_subscriptionState.isPro || _subscriptionState.isFoundingMember) return false;
  const trialStart = _subscriptionState.trialStartDate;
  if (!trialStart) return false;
  return getTrialDaysRemaining() === 0;
};

/**
 * Starts a 14-day trial. No-op if trial already started.
 */
window.startTrial = async function startTrial(uid) {
  if (!uid) return;
  // If already set (in memory), skip
  if (_subscriptionState.trialStartDate) return;

  // Also check Firestore to be safe
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

/**
 * Activates Pro for a user. plan: 'monthly' | 'annual' | 'founding'
 */
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

/**
 * Returns true if user is a Founding Member.
 */
window.isFoundingMember = function isFoundingMember() {
  return _subscriptionState.isFoundingMember === true;
};

/**
 * Reads the Founding Member count from Firestore meta doc.
 * Returns 0 if unavailable.
 */
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

/**
 * Show the paywall modal for a specific feature.
 */
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
    if (trialExpired) {
      statusEl.textContent = "Your trial has expired";
    } else {
      statusEl.textContent = "You're on the Free plan";
    }
  }

  if (ctaEl) {
    if (!trialStarted) {
      ctaEl.textContent = '🎉 Start 14-Day Free Trial';
      ctaEl.onclick = async () => {
        const uid = getUid();
        if (uid) {
          await window.startTrial(uid);
        }
        closePaywall();
        if (typeof window.updateHeader === 'function') window.updateHeader();
        alert('Your 14-day Pro trial has started! Enjoy full access.');
      };
    } else {
      ctaEl.textContent = 'Upgrade to Pro — $4.99/mo';
      ctaEl.onclick = () => {
        closePaywall();
        window.openUpgradeFlow();
      };
    }
  }

  // Show Founding Member section if slots available
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

// ── Init: called on auth state change ─────────────────────────────────────
window.initSubscription = async function initSubscription(uid) {
  _subscriptionState = {
    isPro: false,
    plan: null,
    trialStartDate: null,
    isFoundingMember: false,
    loaded: false
  };
  await loadSubscriptionState(uid);
};
