// QuestGains Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4B4WY32oMm39_W_Nm67_Lvklf27g423w",
  authDomain: "questgains.firebaseapp.com",
  projectId: "questgains",
  storageBucket: "questgains.firebasestorage.app",
  messagingSenderId: "830471147283",
  appId: "1:830471147283:web:d70dfd9b177c1de31e54e6",
  measurementId: "G-JWWJ2PTN5J"
};

const FIREBASE_CONFIGURED = true;
let firebaseInitStatus = null;

function initFirebaseApp() {
  if (firebaseInitStatus) return firebaseInitStatus;
  if (!FIREBASE_CONFIGURED) {
    firebaseInitStatus = { ready: false, reason: 'Firebase is not configured for this build.' };
    return firebaseInitStatus;
  }
  if (!window.firebase) {
    firebaseInitStatus = { ready: false, reason: 'Firebase SDK failed to load.' };
    return firebaseInitStatus;
  }
  try {
    if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    window.auth = firebase.auth();
    firebaseInitStatus = { ready: true, app: firebase.app() };
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    firebaseInitStatus = { ready: false, reason: error?.message || 'Firebase failed to initialize.' };
  }
  return firebaseInitStatus;
}

window.initFirebaseApp = initFirebaseApp;
window.firebaseConfig = firebaseConfig;
initFirebaseApp();
