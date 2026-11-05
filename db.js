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
  const local = localData || {};
  const remote = remoteData || {};
  const merged = { ...local };

  for (const key of CLOUD_SYNC_KEYS) {
    if (remote[key] !== undefined) merged[key] = remote[key];
  }

  // Character: keep remote base, but UNION delete tombstones and merge custom exercises
  // so a delete on one device is not resurrected by an older cloud snapshot.
  const localChar = local.character || {};
  const remoteChar = remote.character || {};
  const baseChar = merged.character && typeof merged.character === 'object' ? { ...merged.character } : { ...remoteChar, ...localChar };

  const deletedWorkoutIds = Array.from(new Set([
    ...(localChar.deletedWorkoutIds || []),
    ...(remoteChar.deletedWorkoutIds || []),
    ...(baseChar.deletedWorkoutIds || [])
  ]));
  const deletedCustomExerciseIds = Array.from(new Set([
    ...(localChar.deletedCustomExerciseIds || []),
    ...(remoteChar.deletedCustomExerciseIds || []),
    ...(baseChar.deletedCustomExerciseIds || [])
  ]));

  const customById = new Map();
  [...(remoteChar.customExercises || []), ...(localChar.customExercises || [])].forEach((ex) => {
    if (!ex || !ex.id || deletedCustomExerciseIds.includes(ex.id)) return;
    if (!customById.has(ex.id)) customById.set(ex.id, ex);
  });

  baseChar.deletedWorkoutIds = deletedWorkoutIds;
  baseChar.deletedCustomExerciseIds = deletedCustomExerciseIds;
  baseChar.customExercises = Array.from(customById.values());
  merged.character = baseChar;

  // workoutLog: merge by id, drop tombstoned entries
  const localLog = Array.isArray(local.workoutLog) ? local.workoutLog : [];
  const remoteLog = Array.isArray(remote.workoutLog) ? remote.workoutLog : [];
  const byId = new Map();
  const ensureId = (entry) => {
    if (!entry) return null;
    if (!entry.id) {
      entry = { ...entry, id: `wl-${entry.dateTime || entry.date || 'x'}-${Math.random().toString(36).slice(2, 8)}` };
    }
    return entry;
  };
  [...remoteLog, ...localLog].forEach((raw) => {
    const entry = ensureId(raw ? { ...raw } : null);
    if (!entry || deletedWorkoutIds.includes(entry.id)) return;
    if (!byId.has(entry.id)) byId.set(entry.id, entry);
  });
  merged.workoutLog = Array.from(byId.values()).sort((a, b) => {
    const ta = Date.parse(a.dateTime || a.date || '') || 0;
    const tb = Date.parse(b.dateTime || b.date || '') || 0;
    return tb - ta;
  });

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
