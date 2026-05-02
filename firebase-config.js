export const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "FIREBASE_AUTH_DOMAIN",
  projectId: "FIREBASE_PROJECT_ID",
  storageBucket: "FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID",
  appId: "FIREBASE_APP_ID"
};

export function isFirebaseConfigured() {
  return Object.values(firebaseConfig).every((value) => value && !String(value).startsWith('FIREBASE_'));
}

export function initFirebaseApp() {
  if (!window.firebase) {
    return { ready: false, reason: 'Firebase SDK failed to load.' };
  }

  if (!isFirebaseConfigured()) {
    return { ready: false, reason: 'Firebase is not configured yet. Add your real Firebase project keys to firebase-config.js.' };
  }

  try {
    const app = window.firebase.apps?.length
      ? window.firebase.app()
      : window.firebase.initializeApp(firebaseConfig);

    return { ready: true, app };
  } catch (error) {
    console.error('Firebase init failed:', error);
    return { ready: false, reason: error.message || 'Firebase initialization failed.' };
  }
}
