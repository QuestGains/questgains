const CLOUD_SYNC_KEYS = ['character', 'workoutLog', 'progressHistory', 'todaysMeals', 'questProgress', 'cardioLog'];
const SAVE_DEBOUNCE_MS = 2000;
let pendingSaveTimer = null;

function getFirestore() {
  const status = typeof window.initFirebaseApp === 'function'
    ? window.initFirebaseApp()
    : { ready: false, reason: 'Firebase is unavailable.' };

  if (!status.ready || !window.db) return null;
  return window.db;
}

function getLocalGameData() {
  return typeof window.getQuestGainsData === 'function' ? window.getQuestGainsData() : null;
}

function mergeGameData(localData = {}, remoteData = {}) {
  const merged = { ...(localData || {}) };

  for (const key of CLOUD_SYNC_KEYS) {
    if (remoteData && remoteData[key] !== undefined) {
      merged[key] = remoteData[key];
    }
  }

  return merged;
}

async function saveUserData(userId, data) {
  if (!userId || !data) return false;

  const db = getFirestore();
  if (!db || !window.firebase?.firestore?.FieldValue) return false;

  const payload = {};
  for (const key of CLOUD_SYNC_KEYS) {
    payload[key] = data[key] ?? null;
  }

  payload.updatedAt = window.firebase.firestore.FieldValue.serverTimestamp();

  // Also persist username in profile so leaderboard queries work
  const username = window.currentUsername || localStorage.getItem('qg_username');
  if (username) {
    payload.profile = { username };
  }

  await db.collection('users').doc(userId).set(payload, { merge: true });
  return true;
}

async function loadUserData(userId) {
  if (!userId) return null;

  const db = getFirestore();
  if (!db) return null;

  const doc = await db.collection('users').doc(userId).get();
  if (!doc.exists) return null;

  const data = doc.data() || {};
  const payload = {};
  for (const key of CLOUD_SYNC_KEYS) {
    if (data[key] !== undefined) payload[key] = data[key];
  }

  return payload;
}

function saveUserDataDebounced(userId, data = getLocalGameData()) {
  if (!userId || !data) return;

  clearTimeout(pendingSaveTimer);
  pendingSaveTimer = window.setTimeout(async () => {
    pendingSaveTimer = null;
    try {
      await saveUserData(userId, data);
    } catch (error) {
      console.error('Cloud save failed:', error);
    }
  }, SAVE_DEBOUNCE_MS);
}

async function flushPendingUserData(userId, data = getLocalGameData()) {
  if (pendingSaveTimer) {
    clearTimeout(pendingSaveTimer);
    pendingSaveTimer = null;
  }

  if (!userId || !data) return false;

  try {
    return await saveUserData(userId, data);
  } catch (error) {
    console.error('Final cloud save failed:', error);
    return false;
  }
}

window.loadUserData = loadUserData;
window.saveUserData = saveUserData;
window.saveUserDataDebounced = saveUserDataDebounced;
window.mergeGameData = mergeGameData;
window.flushPendingUserData = flushPendingUserData;
window.getLocalGameData = getLocalGameData;

window.addEventListener('beforeunload', () => {
  if (window.currentUserId) {
    flushPendingUserData(window.currentUserId, getLocalGameData());
  }
});
