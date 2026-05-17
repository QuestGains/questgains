// QuestGains Notifications v1.0 — Phase II Part 2
// Firebase Cloud Messaging: token registration, permission, preferences

const FUNCTIONS_BASE = 'https://us-central1-questgains.cloudfunctions.net';
let VAPID_KEY = 'BP1PeF03ad4icaYXrCKjVaWA_uMv4o1EYneM5wLZuVhKvj63Llq3SgKxtR5zmkhtSt0ZH_H2eN_Ju9CjLQQuT9s';

// ── State ─────────────────────────────────────────────────────────────────
let _fcmToken = null;
let _notifPrefs = {
  enabled: false,
  dailyReminder: true,
  questDeadlines: true,
  xpMilestones: true,
  reminderHour: 18
};

// ── Init ──────────────────────────────────────────────────────────────────
window.initNotifications = async function(uid) {
  if (!uid) return;
  await loadNotifPrefs(uid);
  renderNotifSettings();
  if (_notifPrefs.enabled && 'Notification' in window && Notification.permission === 'granted') {
    await registerFcmToken(uid);
    initFcmForeground();
  }
};

// ── Permission + Token ────────────────────────────────────────────────────
window.requestNotificationPermission = async function(uid) {
  if (!('Notification' in window)) {
    alert('Your browser does not support push notifications.');
    return false;
  }
  let permission = Notification.permission;
  if (permission === 'default') permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('Notifications blocked. Enable them in your browser settings.');
    return false;
  }
  const ok = await registerFcmToken(uid);
  if (ok) {
    _notifPrefs.enabled = true;
    await saveNotifPrefs(uid);
    renderNotifSettings();
    initFcmForeground();
  }
  return ok;
};

async function registerFcmToken(uid) {
  try {
    if (!window.firebase || !firebase.messaging) return false;
    const messaging = firebase.messaging();
    const opts = VAPID_KEY ? { vapidKey: VAPID_KEY } : {};
    const token = await messaging.getToken(opts);
    if (!token) return false;
    _fcmToken = token;
    const db = window.db;
    if (db) {
      await db.collection('users').doc(uid).set(
        { fcmTokens: firebase.firestore.FieldValue.arrayUnion(token) },
        { merge: true }
      );
    }
    return true;
  } catch (err) {
    console.warn('[notif] registerFcmToken failed:', err);
    return false;
  }
}

// ── Preferences ───────────────────────────────────────────────────────────
async function loadNotifPrefs(uid) {
  const db = window.db;
  if (!db) return;
  try {
    const doc = await db.collection('users').doc(uid).get();
    const prefs = (doc.exists ? doc.data().notifPrefs : null) || {};
    _notifPrefs = {
      enabled: prefs.enabled === true,
      dailyReminder: prefs.dailyReminder !== false,
      questDeadlines: prefs.questDeadlines !== false,
      xpMilestones: prefs.xpMilestones !== false,
      reminderHour: prefs.reminderHour ?? 18
    };
  } catch (err) {
    console.warn('[notif] loadNotifPrefs failed:', err);
  }
}

async function saveNotifPrefs(uid) {
  const db = window.db;
  if (!db || !uid) return;
  try {
    await db.collection('users').doc(uid).set({ notifPrefs: _notifPrefs }, { merge: true });
  } catch (err) {
    console.warn('[notif] saveNotifPrefs failed:', err);
  }
}

window.updateNotifPref = async function(key, value) {
  const uid = window.currentUserId;
  if (!uid) return;
  _notifPrefs[key] = value;
  await saveNotifPrefs(uid);
  renderNotifSettings();
};

window.disableNotifications = async function() {
  const uid = window.currentUserId;
  if (!uid) return;
  _notifPrefs.enabled = false;
  await saveNotifPrefs(uid);
  if (_fcmToken) {
    const db = window.db;
    if (db) {
      await db.collection('users').doc(uid).set(
        { fcmTokens: firebase.firestore.FieldValue.arrayRemove(_fcmToken) },
        { merge: true }
      );
    }
    _fcmToken = null;
  }
  renderNotifSettings();
};

// ── Render Settings UI ────────────────────────────────────────────────────
function renderNotifSettings() {
  const container = document.getElementById('notif-settings-container');
  if (!container) return;
  const hours = Array.from({length: 24}, (_, i) => {
    const h = i % 12 || 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return '<option value="' + i + '"' + (i === _notifPrefs.reminderHour ? ' selected' : '') + '>' + h + ':00 ' + ampm + '</option>';
  }).join('');
  container.innerHTML =
    '<div class="bg-gray-900 rounded-3xl p-5 mb-4">' +
      '<div class="flex items-center justify-between mb-4">' +
        '<div>' +
          '<p class="text-white font-semibold">Push Notifications</p>' +
          '<p class="text-gray-400 text-xs mt-0.5">' + (_notifPrefs.enabled ? '🟢 Enabled' : '⚫ Disabled') + '</p>' +
        '</div>' +
        '<button onclick="' + (_notifPrefs.enabled ? 'window.disableNotifications()' : 'window.requestNotificationPermission(window.currentUserId)') + '" ' +
          'class="' + (_notifPrefs.enabled ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700') + ' text-white text-sm font-medium px-4 py-2 rounded-2xl transition">' +
          (_notifPrefs.enabled ? 'Disable' : 'Enable') +
        '</button>' +
      '</div>' +
      (_notifPrefs.enabled ?
        '<div class="space-y-3 border-t border-gray-700 pt-4">' +
          '<label class="flex items-center justify-between">' +
            '<span class="text-sm text-gray-300">Daily workout reminder</span>' +
            '<input type="checkbox"' + (_notifPrefs.dailyReminder ? ' checked' : '') + ' onchange="window.updateNotifPref(\'dailyReminder\', this.checked)" class="w-4 h-4 accent-indigo-500">' +
          '</label>' +
          (_notifPrefs.dailyReminder ?
            '<div class="flex items-center justify-between pl-2">' +
              '<span class="text-xs text-gray-400">Reminder time</span>' +
              '<select onchange="window.updateNotifPref(\'reminderHour\', parseInt(this.value))" class="bg-gray-800 text-white text-sm rounded-xl px-3 py-1.5">' + hours + '</select>' +
            '</div>' : '') +
          '<label class="flex items-center justify-between">' +
            '<span class="text-sm text-gray-300">Quest deadlines</span>' +
            '<input type="checkbox"' + (_notifPrefs.questDeadlines ? ' checked' : '') + ' onchange="window.updateNotifPref(\'questDeadlines\', this.checked)" class="w-4 h-4 accent-indigo-500">' +
          '</label>' +
          '<label class="flex items-center justify-between">' +
            '<span class="text-sm text-gray-300">XP milestones & level-ups</span>' +
            '<input type="checkbox"' + (_notifPrefs.xpMilestones ? ' checked' : '') + ' onchange="window.updateNotifPref(\'xpMilestones\', this.checked)" class="w-4 h-4 accent-indigo-500">' +
          '</label>' +
        '</div>' : '') +
    '</div>';
}

// ── Foreground messages ────────────────────────────────────────────────────
function initFcmForeground() {
  try {
    if (!firebase.messaging) return;
    const messaging = firebase.messaging();
    messaging.onMessage(function(payload) {
      const n = payload.notification || {};
      if (n.title) showNotifToast(n.title, n.body);
    });
  } catch (err) {
    console.warn('[notif] initFcmForeground failed:', err);
  }
}

function showNotifToast(title, body) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white rounded-2xl px-5 py-3 shadow-xl max-w-xs text-sm';
  toast.innerHTML = '<p class="font-semibold">' + title + '</p>' + (body ? '<p class="text-indigo-200 text-xs mt-0.5">' + body + '</p>' : '');
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 5000);
}

window.getNotifPrefs = function() { return Object.assign({}, _notifPrefs); };
