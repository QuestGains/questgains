const VALID_INVITE_CODE = 'QUESTGAINS2025';
const state = {
  activeTab: 'login',
  auth: null,
  provider: null,
  logoutRequested: false,
  offlineMode: false
};

const ui = {};

function cacheUi() {
  ui.overlay = document.getElementById('login-overlay');
  ui.appShell = document.getElementById('app-shell');
  ui.loginTab = document.getElementById('auth-tab-login');
  ui.registerTab = document.getElementById('auth-tab-register');
  ui.loginForm = document.getElementById('login-form');
  ui.registerForm = document.getElementById('register-form');
  ui.loginError = document.getElementById('login-error');
  ui.registerError = document.getElementById('register-error');
  ui.status = document.getElementById('auth-status');
  ui.googleButton = document.getElementById('google-signin-btn');
  ui.appleButton = document.getElementById('apple-signin-btn');
  ui.appleButtonRegister = document.getElementById('apple-signin-btn-register');
  ui.signOutButton = document.getElementById('signout-btn');
  ui.deleteAccountButton = document.getElementById('delete-account-btn');
  ui.userEmail = document.getElementById('user-email');
  ui.continueOfflineButton = document.getElementById('continue-offline-btn');
}

function setActiveTab(tab) {
  state.activeTab = tab;
  const loginActive = tab === 'login';
  ui.loginForm.classList.toggle('hidden', !loginActive);
  ui.registerForm.classList.toggle('hidden', loginActive);
  ui.loginTab.className = `rounded-2xl px-4 py-3 text-sm font-semibold transition ${loginActive ? 'bg-green-500 text-gray-950' : 'text-gray-400'}`;
  ui.registerTab.className = `rounded-2xl px-4 py-3 text-sm font-semibold transition ${!loginActive ? 'bg-green-500 text-gray-950' : 'text-gray-400'}`;
  clearErrors();
}

function clearErrors() {
  [ui.loginError, ui.registerError].forEach((node) => {
    node.textContent = '';
    node.classList.add('hidden');
  });
}

function showError(target, message) {
  target.textContent = message;
  target.classList.remove('hidden');
}

function showStatus(message) {
  if (!message) {
    ui.status.textContent = '';
    ui.status.classList.add('hidden');
    return;
  }

  ui.status.textContent = message;
  ui.status.classList.remove('hidden');
}

function setUserEmail(email, offline = false) {
  if (!ui.userEmail) return; // element removed from header
}

function showApp() {
  ui.appShell.classList.remove('hidden');
  ui.overlay.classList.add('hidden');
}

function showLogin() {
  ui.overlay.classList.remove('hidden');
  ui.appShell.classList.add('hidden');
}

function enableOfflineMode(message) {
  state.offlineMode = true;
  showStatus(message || 'Firebase is unavailable. You can still use QuestGains locally.');
  ui.continueOfflineButton.classList.remove('hidden');
  ui.googleButton.disabled = true;
  ui.googleButton.classList.add('opacity-50', 'cursor-not-allowed');
  if (ui.appleButton) { ui.appleButton.disabled = true; ui.appleButton.classList.add('opacity-50', 'cursor-not-allowed'); }
  if (ui.appleButtonRegister) { ui.appleButtonRegister.disabled = true; ui.appleButtonRegister.classList.add('opacity-50', 'cursor-not-allowed'); }
  document.querySelectorAll('#login-form input, #register-form input, #login-form button[type="submit"], #register-form button[type="submit"]').forEach((node) => {
    node.disabled = true;
    node.classList.add('opacity-50', 'cursor-not-allowed');
  });
  setUserEmail('Offline mode', true);
}

async function handleAuthenticatedUser(user) {
  window.currentUserId = user.uid;
  state.offlineMode = false;
  setUserEmail(user.email || 'Signed in');
  if (ui.signOutButton) ui.signOutButton.classList.remove('hidden');
  if (ui.deleteAccountButton) ui.deleteAccountButton.classList.remove('hidden');
  const resetBtn = document.getElementById('reset-progress-btn');
  if (resetBtn) resetBtn.classList.remove('hidden');

  try {
    const localData = typeof window.getQuestGainsData === 'function' ? window.getQuestGainsData() : {};
    const remoteData = await window.loadUserData(user.uid);
    const mergedData = window.mergeGameData(localData, remoteData || {});
    if (typeof window.applyQuestGainsCloudState === 'function') {
      window.applyQuestGainsCloudState(mergedData);
    }
  } catch (error) {
    console.error('Failed loading cloud data:', error);
    showStatus('Signed in, but cloud data could not be loaded. Local data is still available.');
  }

  // Ensure username is set before showing app (prompts on first login)
  if (typeof window.ensureUsername === 'function') {
    try {
      await window.ensureUsername(user.uid);
    } catch (err) {
      console.warn('ensureUsername failed:', err);
    }
  }

  // Load subscription state and auto-start trial on first login
  if (typeof window.initSubscription === 'function') {
    try {
      await window.initSubscription(user.uid);
    } catch (err) {
      console.warn('initSubscription failed:', err);
    }
  }
  if (typeof window.startTrial === 'function') {
    try {
      await window.startTrial(user.uid);
    } catch (err) {
      console.warn('startTrial failed:', err);
    }
  }
  if (typeof window.initNotifications === 'function') {
    window.initNotifications(user.uid).catch(() => {});
  }
  if (typeof window.initSocial === 'function') {
    window.initSocial(user.uid).catch(() => {});
  }

  showApp();
  showStatus('');
}

async function handleSignedOut() {
  window.currentUserId = null;
  if (ui.signOutButton) ui.signOutButton.classList.add('hidden');
  if (ui.deleteAccountButton) ui.deleteAccountButton.classList.add('hidden');
  const resetBtn2 = document.getElementById('reset-progress-btn');
  if (resetBtn2) resetBtn2.classList.add('hidden');

  if (state.logoutRequested) {
    state.logoutRequested = false;
    if (typeof window.clearQuestGainsLocalData === 'function') {
      window.clearQuestGainsLocalData();
    }
    window.location.reload();
    return;
  }

  if (state.offlineMode) {
    showApp();
    return;
  }

  setUserEmail(null);

  // Clear form fields on sign-out so iOS autocomplete doesn't re-fill stale credentials
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const registerEmail = document.getElementById('register-email');
  const registerPassword = document.getElementById('register-password');
  if (loginEmail) loginEmail.value = '';
  if (loginPassword) loginPassword.value = '';
  if (registerEmail) registerEmail.value = '';
  if (registerPassword) registerPassword.value = '';

  showLogin();
}

async function signInWithEmail(event) {
  event.preventDefault();
  clearErrors();
  if (!state.auth) return;

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  try {
    await state.auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    // Firebase SDK 10.x merges auth/wrong-password + auth/user-not-found into auth/invalid-credential
    let msg = error.message || 'Unable to sign in.';
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      msg = 'Email or password is incorrect. If you previously signed in with Apple, use the Apple button instead.';
    } else if (error.code === 'auth/too-many-requests') {
      msg = 'Too many failed attempts. Please wait a few minutes and try again.';
    } else if (error.code === 'auth/network-request-failed') {
      msg = 'Network error. Check your connection and try again.';
    }
    showError(ui.loginError, msg);
  }
}

async function registerWithEmail(event) {
  event.preventDefault();
  clearErrors();
  if (!state.auth) return;

  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const inviteCode = document.getElementById('register-invite').value.trim().toUpperCase();

  if (inviteCode !== VALID_INVITE_CODE) {
    showError(ui.registerError, 'Invalid invite code.');
    return;
  }

  try {
    await state.auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    showError(ui.registerError, error.message || 'Unable to create account.');
  }
}

// ---------------------------------------------------------------------------
// Sign in with Apple — native iOS bridge
// ---------------------------------------------------------------------------

// On-screen debug panel — no Safari Web Inspector required.
// Shows nonce chain values and Firebase error codes on the device screen.
function siwaDebug(lines) {
  try {
    const panel = document.getElementById('siwa-debug-panel');
    const content = document.getElementById('siwa-debug-content');
    if (!panel || !content) return;
    const ts = new Date().toLocaleTimeString();
    const text = (Array.isArray(lines) ? lines : [lines]).join('\n');
    content.textContent = '[' + ts + ']\n' + text;
    panel.style.display = 'block';
    // Auto-hide after 90 seconds
    clearTimeout(panel._hideTimer);
    panel._hideTimer = setTimeout(() => { panel.style.display = 'none'; }, 90000);
  } catch(e) { /* never let debug code break auth */ }
}

// Called from Swift before auth completes — shows nonce first 8 from native side
window.siwaDebugFromNative = function(msg) {
  siwaDebug('📱 Native: ' + msg);
};

function isNativeIOS() {
  return !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers['sign-in-with-apple']);
}

function setupAppleSignInBridge() {
  if (!isNativeIOS()) return;

  // Show the Apple buttons
  [ui.appleButton, ui.appleButtonRegister].forEach(btn => {
    if (btn) btn.style.display = '';
  });

  // Handle successful sign-in from native layer
  window.onAppleSignIn = async function(payload) {
    try {
      showStatus('Signing in with Apple…');

      // ── On-screen debug panel (no Web Inspector needed) ──
      const _dbgNonce8  = payload?.rawNonce?.substring(0, 8) ?? 'MISSING';
      const _dbgTokLen  = payload?.identityToken?.length ?? 'MISSING';
      const _dbgKeys    = payload ? Object.keys(payload).join(', ') : 'null payload';
      siwaDebug([
        'JS onAppleSignIn called',
        'payload keys: ' + _dbgKeys,
        'rawNonce (first 8): ' + _dbgNonce8,
        'identityToken length: ' + _dbgTokLen,
        'userIdentifier: ' + (payload?.userIdentifier ?? 'MISSING'),
        '→ calling signInWithCredential...'
      ]);
      // Also log to console for Xcode
      console.log('[SIWA-JS] onAppleSignIn — nonce8:', _dbgNonce8, 'tokenLen:', _dbgTokLen);
      // ── End diagnostics ──

      if (!payload || !payload.identityToken) {
        throw new Error('Apple did not return an identity token. Please try again.');
      }

      if (!state.auth) {
        throw new Error('Firebase Auth is not initialized. Check your internet connection and try again.');
      }

      if (!payload.rawNonce) {
        throw new Error('Apple sign-in is missing the nonce. Ensure the native layer generates a nonce before calling ASAuthorizationAppleIDProvider.');
      }

      const provider = new window.firebase.auth.OAuthProvider('apple.com');
      // rawNonce is generated in Swift (SignInWithApple.swift → randomNonceString()),
      // SHA256-hashed into the ASAuthorizationAppleIDRequest.nonce, and Apple embeds
      // the hash in the returned identityToken. Firebase verifies the hash matches
      // rawNonce to confirm the request originated from this app.
      const credential = provider.credential({
        idToken: payload.identityToken,
        rawNonce: payload.rawNonce
      });
      console.log('[SIWA-JS] OAuthProvider credential created — calling signInWithCredential');
      await state.auth.signInWithCredential(credential);
      console.log('[SIWA-JS] signInWithCredential succeeded');
      // onAuthStateChanged handles login → hideOverlay flow
    } catch(err) {
      console.error('[SIWA] Firebase sign-in error:', err.code, err.message);
      const msg = err.code
        ? `Sign-in failed (${err.code}): ${err.message}`
        : (err.message || 'Apple sign-in failed. Please try again.');
      // Show error on-screen debug panel too
      siwaDebug([
        '❌ Firebase error: ' + (err.code || 'unknown'),
        err.message || '',
        'rawNonce was: ' + (payload?.rawNonce?.substring(0,8) ?? 'nil'),
        'tokenLen was: ' + (payload?.identityToken?.length ?? 'nil')
      ]);
      showStatus('');
      showError(ui.loginError || document.getElementById('auth-status'), msg);
    }
  };

  // Handle revoked credential (called on app launch by native layer)
  window.onAppleSignInRevoked = function() {
    if (state.auth && state.auth.currentUser) {
      state.auth.signOut();
    }
  };

  // Handle errors from native layer
  window.onAppleSignInError = function(message) {
    showError(ui.loginError, message || 'Apple sign-in failed.');
  };
}

function signInWithApple(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();
  if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
  if (!isNativeIOS()) return;
  // Log on JS side so we can confirm the handler fires on all iPad models
  console.log('[SIWA] signInWithApple called — posting to native message handler');
  try {
    window.webkit.messageHandlers['sign-in-with-apple'].postMessage({});
    console.log('[SIWA] postMessage sent successfully');
  } catch (err) {
    console.error('[SIWA] postMessage failed:', err);
  }
}

async function signInWithGoogle() {
  clearErrors();
  if (!state.auth || !state.provider) return;

  try {
    await state.auth.signInWithPopup(state.provider);
  } catch (error) {
    showError(ui.loginError, error.message || 'Google sign-in failed.');
  }
}

async function signOut() {
  if (!state.auth) return;

  state.logoutRequested = true;
  try {
    await window.flushPendingUserData(window.currentUserId, window.getQuestGainsData?.());
  } catch (error) {
    console.warn('Final sync before logout failed:', error);
  }

  await state.auth.signOut();
}

function bindEvents() {
  ui.loginTab.addEventListener('click', () => setActiveTab('login'));
  ui.registerTab.addEventListener('click', () => setActiveTab('register'));
  ui.loginForm.addEventListener('submit', signInWithEmail);
  ui.registerForm.addEventListener('submit', registerWithEmail);
  ui.googleButton.addEventListener('click', signInWithGoogle);
  ui.appleButton?.addEventListener('click', signInWithApple);
  ui.appleButtonRegister?.addEventListener('click', signInWithApple);
  ui.signOutButton?.addEventListener('click', signOut);

  // Show Apple button only inside the native iOS app shell
  setupAppleSignInBridge();
  ui.continueOfflineButton?.addEventListener('click', () => {
    state.offlineMode = true;
    setUserEmail('Offline mode', true);
    showApp();
  });
}

function initAuth() {
  cacheUi();
  bindEvents();
  setActiveTab('login');

  const status = typeof window.initFirebaseApp === 'function'
    ? window.initFirebaseApp()
    : { ready: false, reason: 'Firebase is unavailable.' };

  if (!status.ready) {
    enableOfflineMode(status.reason);
    showLogin();
    return;
  }

  state.auth = window.auth;
  state.provider = new window.firebase.auth.GoogleAuthProvider();
  state.auth.onAuthStateChanged(async (user) => {
    if (user) {
      await handleAuthenticatedUser(user);
    } else {
      await handleSignedOut();
    }
  });
}

document.addEventListener('DOMContentLoaded', initAuth);

// Password Reset
window.sendPasswordReset = async function() {
  const emailInput = document.getElementById('login-email');
  const email = emailInput?.value?.trim();
  if (!email) {
    alert('Enter your email address first, then tap Forgot password.');
    return;
  }
  if (!state.auth) {
    alert('Not connected to Firebase. Try again in a moment.');
    return;
  }
  try {
    await state.auth.sendPasswordResetEmail(email);
    alert(`Password reset email sent to ${email}. Check your inbox.`);
  } catch(err) {
    if (err.code === 'auth/user-not-found') {
      alert('No account found with that email address.');
    } else {
      alert('Error: ' + (err.message || 'Could not send reset email.'));
    }
  }
};

// Account Deletion
window.deleteAccount = async function() {
  const confirmed = confirm(
    '⚠️ Delete your QuestGains account?\n\n' +
    'This will permanently delete:\n' +
    '• Your account login\n' +
    '• All your game progress (XP, levels, quests)\n' +
    '• All workout and meal history\n\n' +
    'This cannot be undone. Are you sure?'
  );
  if (!confirmed) return;

  const doubleConfirm = confirm('This is permanent and cannot be undone. Delete account?');
  if (!doubleConfirm) return;

  if (!state.auth?.currentUser) {
    alert('Not logged in.');
    return;
  }

  const userId = state.auth.currentUser.uid;
  try {
    // Delete Firestore data first
    if (window.db) {
      await window.db.collection('users').doc(userId).delete();
    }
    // Delete the auth account
    await state.auth.currentUser.delete();
    // Clear local data
    localStorage.clear();
    alert('Your account has been deleted.');
    window.location.reload();
  } catch(err) {
    if (err.code === 'auth/requires-recent-login') {
      alert('For security, please sign out and sign back in, then try deleting your account again.');
    } else {
      alert('Error deleting account: ' + (err.message || 'Unknown error.'));
    }
  }
};

// ─── Reset Progress ───────────────────────────────────────────────────────────
window.resetProgress = async function() {
  const confirmed = confirm(
    '🔄 Reset your QuestGains progress?\n\n' +
    'This will permanently delete:\n' +
    '• All XP, levels, and badges\n' +
    '• All workout, cardio, and meal logs\n' +
    '• Your streak and quest history\n\n' +
    'Your account, username, and friends will be kept.\n\n' +
    'This cannot be undone. Continue?'
  );
  if (!confirmed) return;
  const doubleConfirm = confirm('Reset all progress? This is permanent.');
  if (!doubleConfirm) return;

  if (!state.auth?.currentUser) { alert('Not logged in.'); return; }
  const uid = state.auth.currentUser.uid;

  try {
    if (window.db) {
      // Preserve profile and friends, wipe everything else
      const userRef = window.db.collection('users').doc(uid);
      const doc = await userRef.get();
      const data = doc.exists ? doc.data() : {};
      const preserved = {
        profile: data.profile || {},
        friends: data.friends || [],
        friendRequests: data.friendRequests || []
      };
      await userRef.set(preserved);
      // Wipe weeklyXP subcollection
      const weeklySnap = await userRef.collection('weeklyXP').get();
      const batch = window.db.batch();
      weeklySnap.docs.forEach(d => batch.delete(d.ref));
      await batch.commit();
    }
    // Clear local game state
    const keysToKeep = ['qg_username'];
    const kept = {};
    keysToKeep.forEach(k => { const v = localStorage.getItem(k); if (v) kept[k] = v; });
    localStorage.clear();
    keysToKeep.forEach(k => { if (kept[k]) localStorage.setItem(k, kept[k]); });

    alert('✅ Progress reset. Starting fresh!');
    window.location.reload();
  } catch(err) {
    console.error('resetProgress error:', err);
    alert('Error resetting progress: ' + (err.message || 'Unknown error.'));
  }
};
