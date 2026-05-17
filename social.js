// QuestGains Social v1.0 — Phase II Part 3
// Friends system, friend leaderboard, social sharing

// ── Friend Request System ─────────────────────────────────────────────────

window.sendFriendRequest = async function(targetUid) {
  const uid = window.currentUserId;
  const db = window.db;
  if (!uid || !db || !targetUid || targetUid === uid) return;

  try {
    const batch = db.batch();
    // Add to target's incoming requests
    const inRef = db.collection('users').doc(targetUid).collection('friendRequests').doc(uid);
    batch.set(inRef, {
      from: uid,
      username: window.currentUsername || 'Unknown',
      sentAt: firebase.firestore.FieldValue.serverTimestamp(),
      status: 'pending'
    });
    // Mark as sent in our outgoing
    const outRef = db.collection('users').doc(uid).collection('sentRequests').doc(targetUid);
    batch.set(outRef, { to: targetUid, sentAt: firebase.firestore.FieldValue.serverTimestamp() });
    await batch.commit();
    return true;
  } catch (err) {
    console.warn('[social] sendFriendRequest failed:', err);
    return false;
  }
};

window.acceptFriendRequest = async function(fromUid) {
  const uid = window.currentUserId;
  const db = window.db;
  if (!uid || !db) return;

  try {
    const batch = db.batch();
    // Add mutual friendship
    batch.set(db.collection('users').doc(uid).collection('friends').doc(fromUid),
      { since: firebase.firestore.FieldValue.serverTimestamp() });
    batch.set(db.collection('users').doc(fromUid).collection('friends').doc(uid),
      { since: firebase.firestore.FieldValue.serverTimestamp() });
    // Remove request
    batch.delete(db.collection('users').doc(uid).collection('friendRequests').doc(fromUid));
    await batch.commit();
    await renderFriendRequests();
    await renderFriendsLeaderboard();
    alert('Friend added! 🤝');
  } catch (err) {
    console.warn('[social] acceptFriendRequest failed:', err);
  }
};

window.declineFriendRequest = async function(fromUid) {
  const uid = window.currentUserId;
  const db = window.db;
  if (!uid || !db) return;
  try {
    await db.collection('users').doc(uid).collection('friendRequests').doc(fromUid).delete();
    await renderFriendRequests();
  } catch (err) {
    console.warn('[social] declineFriendRequest failed:', err);
  }
};

window.removeFriend = async function(friendUid) {
  const uid = window.currentUserId;
  const db = window.db;
  if (!uid || !db) return;
  if (!confirm('Remove this friend?')) return;
  try {
    await db.collection('users').doc(uid).collection('friends').doc(friendUid).delete();
    await db.collection('users').doc(friendUid).collection('friends').doc(uid).delete();
    await renderFriendsLeaderboard();
  } catch (err) {
    console.warn('[social] removeFriend failed:', err);
  }
};

// ── Add Friend by Username ─────────────────────────────────────────────────
window.searchAndAddFriend = async function() {
  const input = document.getElementById('friend-username-input');
  const errorEl = document.getElementById('friend-search-error');
  if (!input || !errorEl) return;
  const username = input.value.trim();
  errorEl.textContent = '';
  if (!username) { errorEl.textContent = 'Enter a username.'; return; }
  if (username.toLowerCase() === (window.currentUsername || '').toLowerCase()) {
    errorEl.textContent = 'You cannot add yourself.';
    return;
  }
  errorEl.textContent = 'Searching…';
  try {
    const result = await window.findUserByUsername(username);
    if (!result) { errorEl.textContent = 'User not found.'; return; }

    // Check if already friends
    const db = window.db;
    const uid = window.currentUserId;
    const existing = await db.collection('users').doc(uid).collection('friends').doc(result.uid).get();
    if (existing.exists) { errorEl.textContent = 'Already friends!'; return; }

    const ok = await window.sendFriendRequest(result.uid);
    if (ok) {
      input.value = '';
      errorEl.textContent = '';
      errorEl.style.color = '#4ade80';
      errorEl.textContent = 'Friend request sent! ✓';
      setTimeout(() => { errorEl.textContent = ''; errorEl.style.color = ''; }, 3000);
    } else {
      errorEl.textContent = 'Could not send request.';
    }
  } catch (err) {
    console.error('[social] searchAndAddFriend error:', err);
    errorEl.textContent = 'Error. Try again.';
  }
};

// ── Render Friend Requests ─────────────────────────────────────────────────
async function renderFriendRequests() {
  const container = document.getElementById('friend-requests-container');
  if (!container) return;
  const uid = window.currentUserId;
  const db = window.db;
  if (!uid || !db) return;

  try {
    const snap = await db.collection('users').doc(uid).collection('friendRequests')
      .where('status', '==', 'pending').limit(10).get();
    if (snap.empty) {
      container.innerHTML = '';
      return;
    }
    container.innerHTML = '<div class="text-xs font-semibold text-yellow-400 uppercase tracking-widest mb-2">Friend Requests</div>';
    snap.forEach(doc => {
      const data = doc.data();
      const div = document.createElement('div');
      div.className = 'flex items-center justify-between bg-gray-800 rounded-2xl px-4 py-3 mb-2';
      div.innerHTML =
        '<span class="text-sm text-white">' + (data.username || 'Unknown') + ' wants to be friends</span>' +
        '<div class="flex gap-2">' +
          '<button onclick="window.acceptFriendRequest(\'' + doc.id + '\')" class="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-xl">Accept</button>' +
          '<button onclick="window.declineFriendRequest(\'' + doc.id + '\')" class="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-xl">Decline</button>' +
        '</div>';
      container.appendChild(div);
    });
  } catch (err) {
    console.warn('[social] renderFriendRequests failed:', err);
  }
}
window.renderFriendRequests = renderFriendRequests;

// ── Friends Leaderboard ────────────────────────────────────────────────────
async function renderFriendsLeaderboard() {
  const container = document.getElementById('friends-leaderboard-list');
  if (!container) return;
  const uid = window.currentUserId;
  const db = window.db;
  if (!uid || !db) {
    container.innerHTML = '<div class="text-center text-gray-400 py-4 text-sm">Sign in to see friends</div>';
    return;
  }

  container.innerHTML = '<div class="text-center text-gray-400 py-4 text-sm">Loading…</div>';

  try {
    const friendsSnap = await db.collection('users').doc(uid).collection('friends').limit(50).get();
    const friendUids = friendsSnap.docs.map(d => d.id);

    if (friendUids.length === 0) {
      container.innerHTML =
        '<div class="text-center text-gray-400 py-6 text-sm">No friends yet — add some above! 👋</div>';
      return;
    }

    // Fetch friend profiles
    const profiles = await Promise.all(friendUids.map(fuid =>
      db.collection('users').doc(fuid).get().then(doc => {
        if (!doc.exists) return null;
        const data = doc.data();
        return {
          uid: fuid,
          username: data?.profile?.username || '?',
          xp: data?.character?.xp || 0,
          level: data?.character?.level || 1,
          isUser: false
        };
      }).catch(() => null)
    ));

    // Add myself
    profiles.push({
      uid,
      username: window.currentUsername || 'You',
      xp: (typeof character !== 'undefined' ? character.xp : 0) || 0,
      level: (typeof character !== 'undefined' ? character.level : 1) || 1,
      isUser: true
    });

    const valid = profiles.filter(Boolean).sort((a, b) => b.xp - a.xp);
    container.innerHTML = '';

    valid.forEach((user, idx) => {
      const rank = idx + 1;
      const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '#' + rank;
      const div = document.createElement('div');
      div.className = 'p-4 rounded-3xl flex items-center justify-between ' +
        (user.isUser ? 'bg-green-900/40 border border-green-500/30' : 'bg-gray-900');
      div.innerHTML =
        '<div class="flex items-center gap-4">' +
          '<div class="text-2xl font-bold ' + (user.isUser ? 'text-green-400' : 'text-gray-400') + ' w-10">' + rankEmoji + '</div>' +
          '<div>' +
            '<div class="font-semibold ' + (user.isUser ? 'text-green-300' : 'text-white') + '">' + user.username + (user.isUser ? ' (You)' : '') + '</div>' +
            '<div class="text-sm ' + (user.isUser ? 'text-green-400' : 'text-gray-400') + '">Level ' + user.level + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="flex items-center gap-3">' +
          '<div class="text-xl font-bold">' + user.xp.toLocaleString() + ' XP</div>' +
          (!user.isUser ? '<button onclick="window.removeFriend(\'' + user.uid + '\')" class="text-gray-600 hover:text-red-400 text-xs">✕</button>' : '') +
        '</div>';
      container.appendChild(div);
    });
  } catch (err) {
    console.warn('[social] renderFriendsLeaderboard failed:', err);
    container.innerHTML = '<div class="text-center text-gray-400 py-4 text-sm">Could not load friends.</div>';
  }
}
window.renderFriendsLeaderboard = renderFriendsLeaderboard;

// ── Social Sharing ────────────────────────────────────────────────────────
window.shareProgress = function(type) {
  const xp = (typeof character !== 'undefined' ? character.xp : 0) || 0;
  const level = (typeof character !== 'undefined' ? character.level : 1) || 1;
  const username = window.currentUsername || 'Hero';
  const streak = (typeof character !== 'undefined' ? character.streak : 0) || 0;

  let text;
  if (type === 'streak') {
    text = '🔥 ' + streak + '-day workout streak on QuestGains! Level ' + level + ' hero grinding hard. Join me: questgains.github.io/questgains';
  } else if (type === 'level') {
    text = '⚔️ Just hit Level ' + level + ' on QuestGains with ' + xp.toLocaleString() + ' XP! Turn your workouts into an RPG. questgains.github.io/questgains';
  } else {
    text = '💪 ' + xp.toLocaleString() + ' XP and counting on QuestGains! Level ' + level + ' • ' + streak + ' day streak. questgains.github.io/questgains';
  }

  if (navigator.share) {
    navigator.share({ title: 'QuestGains', text }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text)
      .then(() => { showSocialToast('Copied to clipboard! Paste anywhere to share. 📋'); })
      .catch(() => { alert(text); });
  }
};

function showSocialToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-28 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white rounded-2xl px-5 py-3 shadow-xl text-sm';
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ── Init social features ──────────────────────────────────────────────────
window.initSocial = async function(uid) {
  if (!uid) return;
  await renderFriendRequests();
  // Check for pending requests badge
  const db = window.db;
  if (!db) return;
  try {
    const snap = await db.collection('users').doc(uid).collection('friendRequests')
      .where('status', '==', 'pending').limit(1).get();
    if (!snap.empty) {
      // Show badge on leaderboard tab
      const lbBtn = document.querySelector('[onclick*="showScreen(6)"], [data-screen="6"]');
      if (lbBtn) {
        const badge = document.createElement('span');
        badge.className = 'absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center';
        badge.textContent = '!';
        lbBtn.style.position = 'relative';
        lbBtn.appendChild(badge);
      }
    }
  } catch (e) { /* silent */ }
};
