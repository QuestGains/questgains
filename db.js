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

// Official board score. Rules (firestore.rules) cap increases; this mirrors those limits
// so one honest action fits in a single write. Stacked bonuses can push a workout or
// boss claim well past 2,000 XP, so the cap is 25,000 per write / 50,000 per minute.
const XP_WRITE_CAP = 25000;
const XP_WINDOW_MS = 55000;

function reconstructLifetimeXp(character, workoutLog) {
  const level = Math.max(1, Math.round(Number(character && character.level) || 1));
  const remainder = Math.max(0, Math.round(Number(character && character.xp) || 0));
  let threshold = Math.max(50, Math.round(Number(character && character.xpToNext) || 100));
  let total = remainder;
  for (let i = 1; i < level; i++) {
    threshold = Math.max(50, Math.round(threshold / 1.3));
    total += threshold;
  }
  const fromWorkouts = (Array.isArray(workoutLog) ? workoutLog : []).reduce((sum, entry) => {
    return sum + Math.max(0, Math.round(Number(entry && entry.xpAwarded) || 0));
  }, 0);
  return Math.min(10000000, Math.max(total, fromWorkouts));
}

function xpGuardState() {
  if (!window._xpGuard) {
    window._xpGuard = { hasLifetime: false, lifetimeXp: 0, windowUsed: 0, startedAt: 0 };
  }
  return window._xpGuard;
}

function rememberXpGuard(lifetime, hasLifetime, windowUsed, startedAt) {
  window._xpGuard = {
    hasLifetime: !!hasLifetime,
    lifetimeXp: Math.max(0, Math.round(Number(lifetime) || 0)),
    windowUsed: Math.max(0, Math.round(Number(windowUsed) || 0)),
    startedAt: Number(startedAt) || 0
  };
}

function isPermissionDenied(err) {
  const code = String((err && err.code) || '');
  return code === 'permission-denied' || code.indexOf('permission-denied') !== -1;
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

  const guard = xpGuardState();
  if (payload.character && typeof payload.character === 'object') {
    const localLifetime = Math.max(0, Math.min(10000000, Math.round(Number(payload.character.lifetimeXp) || 0)));
    let writtenLifetime = localLifetime;
    if (guard.hasLifetime && localLifetime > guard.lifetimeXp + XP_WRITE_CAP) {
      writtenLifetime = guard.lifetimeXp + XP_WRITE_CAP;
    }
    payload.character = { ...payload.character, lifetimeXp: writtenLifetime };
  }

  const writtenLifetime = payload.character && typeof payload.character.lifetimeXp === 'number'
    ? payload.character.lifetimeXp
    : 0;
  const increased = !!(guard.hasLifetime && writtenLifetime > guard.lifetimeXp);
  const delta = increased ? writtenLifetime - guard.lifetimeXp : 0;
  const FV = window.firebase.firestore.FieldValue;

  function bodyFor(mode) {
    const body = { ...payload };
    if (!increased) return body;
    body.lastXpWrite = FV.serverTimestamp();
    if (mode === 'fresh') {
      body.xpWindowStart = FV.serverTimestamp();
      body.xpWindowUsed = delta;
    } else {
      body.xpWindowUsed = (guard.windowUsed || 0) + delta;
    }
    return body;
  }

  const ref = db.collection('users').doc(userId);
  const age = guard.startedAt ? (Date.now() - guard.startedAt) : Infinity;
  const firstMode = increased ? (age > 70000 ? 'fresh' : 'continue') : 'none';

  async function commit(mode) {
    await ref.set(mode === 'none' ? payload : bodyFor(mode), { merge: true });
    if (!payload.character) return;
    if (!increased) {
      rememberXpGuard(writtenLifetime, true, guard.windowUsed, guard.startedAt);
      return;
    }
    if (mode === 'fresh') rememberXpGuard(writtenLifetime, true, delta, Date.now());
    else rememberXpGuard(writtenLifetime, true, (guard.windowUsed || 0) + delta, guard.startedAt || Date.now());
  }

  try {
    await commit(firstMode);
  } catch (err) {
    if (!increased || !isPermissionDenied(err)) throw err;
    const flip = firstMode === 'fresh' ? 'continue' : 'fresh';
    try {
      await commit(flip);
    } catch (err2) {
      if (!isPermissionDenied(err2) || !guard.hasLifetime) throw err2;
      const safe = {
        ...payload,
        character: { ...payload.character, lifetimeXp: guard.lifetimeXp }
      };
      await ref.set(safe, { merge: true });
    }
  }
  return true;
}

async function loadUserData(userId) {
  if (!userId) return null;

  const db = getFirestore();
  if (!db) return null;

  const doc = await db.collection('users').doc(userId).get();
  if (!doc.exists) {
    rememberXpGuard(0, false, 0, 0);
    return null;
  }

  const data = doc.data() || {};
  const lifetime = data.character && data.character.lifetimeXp;
  const hasLifetime = typeof lifetime === 'number' && Number.isFinite(lifetime);
  let startedAt = 0;
  if (data.xpWindowStart && typeof data.xpWindowStart.toMillis === 'function') {
    startedAt = data.xpWindowStart.toMillis();
  }
  rememberXpGuard(hasLifetime ? lifetime : 0, hasLifetime, data.xpWindowUsed || 0, startedAt);
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

window.reconstructLifetimeXp = reconstructLifetimeXp;
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
