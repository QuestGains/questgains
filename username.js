// username.js — Username setup, uniqueness check, and settings

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

/**
 * Get ISO week key: YYYY-WNN
 */
function getISOWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}
window.getISOWeekKey = getISOWeekKey;

/**
 * Check if username is taken (Firestore usernames collection)
 */
async function isUsernameTaken(username) {
  if (!window.db) return false;
  const doc = await window.db.collection('usernames').doc(username.toLowerCase()).get();
  return doc.exists;
}

/**
 * Save username to Firestore:
 * - users/{uid}/profile (as nested field via merge)
 * - usernames/{username_lower} → { uid }
 */
async function saveUsernameToFirestore(uid, username) {
  if (!window.db) return;
  const batch = window.db.batch();

  // Save profile.username in user doc
  const userRef = window.db.collection('users').doc(uid);
  batch.set(userRef, { profile: { username } }, { merge: true });

  // Reserve username in uniqueness index
  const usernameRef = window.db.collection('usernames').doc(username.toLowerCase());
  batch.set(usernameRef, { uid, username });

  await batch.commit();
}

/**
 * Load username from Firestore for the current user
 */
async function loadUsernameFromFirestore(uid) {
  if (!window.db) return null;
  try {
    const doc = await window.db.collection('users').doc(uid).get();
    if (!doc.exists) return null;
    return doc.data()?.profile?.username || null;
  } catch (e) {
    console.warn('loadUsernameFromFirestore failed:', e);
    return null;
  }
}

/**
 * Lookup a user by username — returns { uid, username, xp, level } or null
 */
async function findUserByUsername(username) {
  if (!window.db) return null;
  const usernameDoc = await window.db.collection('usernames').doc(username.toLowerCase()).get();
  if (!usernameDoc.exists) return null;
  const { uid } = usernameDoc.data();
  const userDoc = await window.db.collection('users').doc(uid).get();
  if (!userDoc.exists) return null;
  const data = userDoc.data();
  return {
    uid,
    username: data?.profile?.username || username,
    xp: data?.character?.xp || 0,
    level: data?.character?.level || 1
  };
}
window.findUserByUsername = findUserByUsername;

/**
 * Show the username setup modal (first login).
 * Resolves with the chosen username.
 */
function showUsernameSetupModal(uid) {
  return new Promise((resolve) => {
    // Remove any existing modal
    const existing = document.getElementById('username-setup-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'username-setup-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);padding:1rem;';
    modal.innerHTML = `
      <div style="background:#111;border:1px solid rgba(74,222,128,0.3);border-radius:1.5rem;padding:2rem;max-width:380px;width:100%;box-shadow:0 0 40px rgba(74,222,128,0.1);">
        <div style="text-align:center;margin-bottom:1.5rem;">
          <div style="font-size:2.5rem;margin-bottom:0.5rem;">🦸</div>
          <h2 style="font-size:1.5rem;font-weight:900;color:#4ade80;margin:0 0 0.5rem;">Choose Your Name</h2>
          <p style="font-size:0.8rem;color:#9ca3af;margin:0;">This is your display name on the leaderboard. 3–20 characters, letters/numbers/underscores only.</p>
        </div>
        <input id="username-setup-input" type="text" maxlength="20" placeholder="your_username"
          style="width:100%;background:#1f2937;color:#fff;border:1px solid #374151;border-radius:0.75rem;padding:0.75rem 1rem;font-size:1rem;margin-bottom:0.75rem;box-sizing:border-box;outline:none;"
          autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
        <div id="username-setup-error" style="color:#f87171;font-size:0.8rem;margin-bottom:0.75rem;min-height:1.2em;"></div>
        <button id="username-setup-btn"
          style="width:100%;background:#4ade80;color:#000;border:none;border-radius:0.75rem;padding:0.85rem;font-size:1rem;font-weight:700;cursor:pointer;">
          Set Username
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('username-setup-input');
    const errorEl = document.getElementById('username-setup-error');
    const btn = document.getElementById('username-setup-btn');

    input.focus();

    async function attemptSave() {
      const val = input.value.trim();
      errorEl.textContent = '';
      if (!USERNAME_REGEX.test(val)) {
        errorEl.textContent = 'Username must be 3–20 characters: letters, numbers, underscores only.';
        return;
      }
      if (containsProfanity(val)) {
        errorEl.textContent = 'That username is not allowed. Please choose a different name.';
        return;
      }
      btn.disabled = true;
      btn.textContent = 'Checking…';
      try {
        const taken = await isUsernameTaken(val);
        if (taken) {
          errorEl.textContent = 'That username is already taken. Try another.';
          btn.disabled = false;
          btn.textContent = 'Set Username';
          return;
        }
        await saveUsernameToFirestore(uid, val);
        modal.remove();
        resolve(val);
      } catch (err) {
        console.error('Username save error:', err);
        errorEl.textContent = 'Error saving username. Please try again.';
        btn.disabled = false;
        btn.textContent = 'Set Username';
      }
    }

    btn.addEventListener('click', attemptSave);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') attemptSave(); });
  });
}

/**
 * Handle username flow: check if user has one, prompt if not.
 * Called from auth.js handleAuthenticatedUser before showApp().
 */
async function ensureUsername(uid) {
  if (!window.db) return null;
  try {
    let username = await loadUsernameFromFirestore(uid);
    if (!username) {
      username = await showUsernameSetupModal(uid);
    }
    // Store in localStorage for quick in-app access
    localStorage.setItem('qg_username', username);
    window.currentUsername = username;
    return username;
  } catch (err) {
    console.error('ensureUsername error:', err);
    return null;
  }
}
window.ensureUsername = ensureUsername;

/**
 * Change username from settings — validates, checks uniqueness, saves.
 * Returns { ok, error }
 */
async function changeUsername(uid, newUsername) {
  if (!USERNAME_REGEX.test(newUsername)) {
    return { ok: false, error: 'Username must be 3–20 characters: letters, numbers, underscores only.' };
  }
  if (containsProfanity(newUsername)) {
    return { ok: false, error: 'That username is not allowed. Please choose a different name.' };
  }
  if (!window.db) {
    return { ok: false, error: 'Not connected to Firebase.' };
  }
  // Load old username to remove from index
  const oldUsername = window.currentUsername || localStorage.getItem('qg_username');
  if (oldUsername && oldUsername.toLowerCase() === newUsername.toLowerCase()) {
    return { ok: false, error: 'That is already your username.' };
  }
  const taken = await isUsernameTaken(newUsername);
  if (taken) {
    return { ok: false, error: 'That username is already taken.' };
  }
  // Batch: remove old, add new, update profile
  try {
    const batch = window.db.batch();
    if (oldUsername) {
      const oldRef = window.db.collection('usernames').doc(oldUsername.toLowerCase());
      batch.delete(oldRef);
    }
    const newRef = window.db.collection('usernames').doc(newUsername.toLowerCase());
    batch.set(newRef, { uid, username: newUsername });
    const userRef = window.db.collection('users').doc(uid);
    batch.set(userRef, { profile: { username: newUsername } }, { merge: true });
    await batch.commit();
    localStorage.setItem('qg_username', newUsername);
    window.currentUsername = newUsername;
    return { ok: true };
  } catch (err) {
    console.error('changeUsername error:', err);
    return { ok: false, error: 'Error saving username. Please try again.' };
  }
}
window.changeUsername = changeUsername;

/**
 * Render the username settings section inside the Hero tab.
 * Call this from app.js when rendering screen4.
 */
function renderUsernameSettings() {
  const container = document.getElementById('username-settings-section');
  if (!container) return;
  const currentName = window.currentUsername || localStorage.getItem('qg_username') || '—';
  container.innerHTML = `
    <div class="text-sm font-semibold text-green-400 mb-3">⚙️ Username Settings</div>
    <div class="text-xs text-gray-400 mb-2">Current username: <span class="text-white font-semibold">${currentName}</span></div>
    <div class="flex gap-2 mb-2">
      <input id="username-change-input" type="text" maxlength="20" placeholder="new_username"
        class="flex-1 bg-gray-800 text-white px-3 py-2 rounded-2xl text-sm outline-none border border-gray-700 focus:border-green-500"
        autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
      <button onclick="handleUsernameChange()" class="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-2xl text-sm font-semibold">Save</button>
    </div>
    <div id="username-change-error" class="text-xs text-red-400 min-height:1.2em;"></div>
    <div id="username-change-success" class="text-xs text-green-400 min-height:1.2em;"></div>
  `;
}
window.renderUsernameSettings = renderUsernameSettings;

window.handleUsernameChange = async function() {
  const input = document.getElementById('username-change-input');
  const errorEl = document.getElementById('username-change-error');
  const successEl = document.getElementById('username-change-success');
  if (!input || !errorEl || !successEl) return;
  errorEl.textContent = '';
  successEl.textContent = '';
  const val = input.value.trim();
  if (!window.currentUserId) {
    errorEl.textContent = 'Not logged in.';
    return;
  }
  const result = await changeUsername(window.currentUserId, val);
  if (result.ok) {
    successEl.textContent = `Username updated to "${val}" ✓`;
    input.value = '';
    renderUsernameSettings();
  } else {
    errorEl.textContent = result.error;
  }
};

/**
 * Increment weekly XP in Firestore (lightweight separate write).
 * Call whenever XP is earned.
 */
async function incrementWeeklyXP(uid, amount) {
  if (!uid || !amount || !window.db || !window.firebase?.firestore?.FieldValue) return;
  const weekKey = getISOWeekKey();
  try {
    await window.db
      .collection('users').doc(uid)
      .collection('weeklyXP').doc(weekKey)
      .set({ xp: window.firebase.firestore.FieldValue.increment(amount) }, { merge: true });
  } catch (err) {
    console.warn('incrementWeeklyXP failed:', err);
  }
}
window.incrementWeeklyXP = incrementWeeklyXP;

// ─── Profanity / Inappropriate Username Filter ───────────────────────────────
const BLOCKED_TERMS = [
  'fuck','shit','bitch','cunt','cock','dick','pussy','nigger','nigga',
  'faggot','fag','whore','slut','retard','rape','nazi','hitler','porn',
  'nude','naked','pedo','piss','bastard','spic','kike','chink','gook',
  'wetback','tranny','dyke'
];

function containsProfanity(str) {
  const lower = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return BLOCKED_TERMS.some(t => lower.includes(t));
}
window.containsProfanityInUsername = containsProfanity;
