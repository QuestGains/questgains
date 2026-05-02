import { initFirebaseApp } from './firebase-config.js';

const CLOUD_SYNC_KEYS = ['character', 'workoutLog', 'progressHistory', 'todaysMeals', 'questProgress', 'cardioLog'];
const SAVE_DEBOUNCE_MS = 10000;
let pendingSaveTimer = null;

function getFirestore() {
  const status = initFirebaseApp();
  if (!status.ready || !window.firebase?.firestore) return null;

  try {
    return window.firebase.firestore();
  } catch (error) {
    console.warn('Firestore unavailable:', error);
    return null;
  }
}

export function getLocalGameData() {
  return typeof window.getQuestGainsData === 'function' ? window.getQuestGainsData() : null;
}

export function mergeGameData(localData = {}, remoteData = {}) {
  const merged = { ...(localData || {}) };

  for (const key of CLOUD_SYNC_KEYS) {
    if (remoteData && remoteData[key] !== undefined) {
      merged[key] = remoteData[key];
    }
  }

  return merged;
}

export async function saveUserData(userId, data) {
  if (!userId || !data) return false;

  const db = getFirestore();
  if (!db) return false;

  const payload = {};
  for (const key of CLOUD_SYNC_KEYS) {
    payload[key] = data[key] ?? null;
  }

  payload.updatedAt = window.firebase.firestore.FieldValue.serverTimestamp();

  await db.collection('users').doc(userId).set(payload, { merge: true });
  return true;
}

export async function loadUserData(userId) {
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

export function saveUserDataDebounced(userId, data = getLocalGameData()) {
  if (!userId || !data) return;

  clearTimeout(pendingSaveTimer);
  pendingSaveTimer = window.setTimeout(async () => {
    try {
      await saveUserData(userId, data);
    } catch (error) {
      console.error('Cloud save failed:', error);
    }
  }, SAVE_DEBOUNCE_MS);
}

export async function flushPendingUserData(userId, data = getLocalGameData()) {
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

window.saveUserDataDebounced = saveUserDataDebounced;
window.addEventListener('beforeunload', () => {
  if (window.currentUserId) {
    flushPendingUserData(window.currentUserId, getLocalGameData());
  }
});
