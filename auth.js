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

  showApp();
  showStatus('');
}

async function handleSignedOut() {
  window.currentUserId = null;
  if (ui.signOutButton) ui.signOutButton.classList.add('hidden');
  if (ui.deleteAccountButton) ui.deleteAccountButton.classList.add('hidden');

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
    showError(ui.loginError, error.message || 'Unable to sign in.');
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
  ui.signOutButton?.addEventListener('click', signOut);
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
