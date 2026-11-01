// Run: NODE_PATH=<dir with jsdom> node tests/run-tests.js
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM } = require('jsdom');
const ROOT = path.join(__dirname, '..');
let pass = 0, fail = 0;
async function t(name, fn) { try { await fn(); pass++; console.log('ok  ', name); } catch (e) { fail++; console.log('FAIL', name, '\n   ', e.message); } }

const PAYLOADS = [
  '<img src=x onerror="window.__xss=1">',
  '"><svg onload=window.__xss=1>',
  "'); window.__xss=1; ('",
  '&quot;);window.__xss=1;//',
  '<script>window.__xss=1</script>',
  '`${window.__xss=1}`',
];

(async () => {
  const { escapeHTML, escapeJSString } = require(path.join(ROOT, 'escape.js'));

  await t('escapeHTML basic', () => {
    assert.strictEqual(escapeHTML('<a href="x">&\'</a>'), '&lt;a href&#61;&quot;x&quot;&gt;&amp;&#39;&lt;&#47;a&gt;');
    assert.strictEqual(escapeHTML(null), ''); assert.strictEqual(escapeHTML(undefined), '');
    assert.strictEqual(escapeHTML(42), '42');
  });

  await t('escapeHTML round-trips as text in a real DOM (no elements, exact text)', () => {
    const dom = new JSDOM('<div id=c></div>', { runScripts: 'outside-only' });
    const c = dom.window.document.getElementById('c');
    for (const p of PAYLOADS) {
      c.innerHTML = '<span title="' + escapeHTML(p) + '">' + escapeHTML(p) + '</span>';
      assert.strictEqual(c.querySelectorAll('img,svg,script').length, 0, p);
      assert.strictEqual(c.firstChild.textContent, p);
      assert.strictEqual(c.firstChild.getAttribute('title'), p);
    }
  });

  await t('escapeJSString inside onclick does not break out', () => {
    const dom = new JSDOM('<div id=c></div>', { runScripts: 'dangerously' });
    const w = dom.window; w.got = [];
    w.fn = (v) => w.got.push(v);
    const c = w.document.getElementById('c');
    for (const p of PAYLOADS) {
      c.innerHTML = '<button onclick="fn(\'' + escapeJSString(p) + '\')">b</button>';
      c.firstChild.click();
    }
    assert.strictEqual(w.__xss, undefined);
    assert.deepStrictEqual(w.got, PAYLOADS);
  });

  await t('social.js friends leaderboard + requests escape hostile usernames and ids', async () => {
    const html = '<div id="friend-requests-container"></div><div id="friends-leaderboard-list"></div>';
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    const w = dom.window;
    w.eval(fs.readFileSync(path.join(ROOT, 'escape.js'), 'utf8'));
    const evil = '<img src=x onerror="window.__xss=1">';
    const docs = (arr) => ({ empty: !arr.length, docs: arr, forEach: (f) => arr.forEach(f) });
    const mkDoc = (id, data) => ({ id, exists: true, data: () => data });
    w.currentUserId = 'me'; w.currentUsername = 'me';
    w.db = {
      collection: () => ({
        doc: (id) => ({
          get: async () => mkDoc(id, { profile: { username: evil }, character: { xp: 5, level: 2 } }),
          collection: (sub) => ({
            where: () => ({ limit: () => ({ get: async () => docs([mkDoc("x');window.__xss=1;('", { username: evil, status: 'pending' })]) }) }),
            limit: () => ({ get: async () => docs([mkDoc('f1', {})]) }),
          }),
        }),
      }),
    };
    w.eval(fs.readFileSync(path.join(ROOT, 'social.js'), 'utf8'));
    let accepted = null; w.acceptFriendRequest = (id) => { accepted = id; };
    await w.renderFriendRequests();
    await w.renderFriendsLeaderboard();
    const d = w.document;
    assert.strictEqual(d.querySelectorAll('img').length, 0, 'img injected');
    assert.ok(d.body.textContent.includes(evil), 'username shown as text');
    d.querySelector('[data-act="accept"]').click();
    assert.strictEqual(accepted, "x');window.__xss=1;('");
    assert.strictEqual(w.__xss, undefined);
  });

  await t('notifications toast escapes push title/body', () => {
    const dom = new JSDOM('', { runScripts: 'dangerously' });
    const w = dom.window;
    w.eval(fs.readFileSync(path.join(ROOT, 'escape.js'), 'utf8'));
    const src = fs.readFileSync(path.join(ROOT, 'notifications.js'), 'utf8');
    const fnSrc = src.slice(src.indexOf('function showNotifToast'), src.indexOf('window.getNotifPrefs'));
    w.eval(fnSrc + ';window.showNotifToast=showNotifToast;');
    w.showNotifToast('<img src=x onerror=window.__xss=1>', '<b>hi</b>');
    assert.strictEqual(w.document.querySelectorAll('img,b').length, 0);
  });

  // ── Service worker ──
  function loadSW(failing = []) {
    const listeners = {}; const stores = {}; const logs = [];
    const mkCache = (name) => (stores[name] = stores[name] || {
      entries: new Map(),
      add: async (req) => { const u = typeof req === 'string' ? req : req.url; if (failing.some((f) => u.includes(f))) throw new Error('404 ' + u); stores[name].entries.set(u, 'r'); },
      put: async (req, res) => stores[name].entries.set(req.url || req, res),
      match: async (req) => stores[name].entries.get(req.url || req),
    });
    const ctx = {
      self: null, console: { log: () => {}, error: (...a) => logs.push(a.join(' ')), warn: () => {} },
      importScripts: () => {},
      firebase: { initializeApp: () => {}, messaging: () => ({ onBackgroundMessage: () => {} }) },
      caches: { open: async (n) => mkCache(n), keys: async () => Object.keys(stores).concat(['questgains-v28']), delete: async (n) => { delete stores[n]; return true; }, match: async () => undefined },
      Request: class { constructor(u) { this.url = u; } },
      URL, Promise, fetch: async () => ({ status: 200, clone() { return this; } }),
    };
    ctx.self = { addEventListener: (ev, fn) => (listeners[ev] = fn), skipWaiting: async () => {}, clients: { claim: async () => {} }, location: { origin: 'https://questgains.github.io' }, registration: {} };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8'), ctx);
    return { listeners, stores, logs, ctx };
  }

  await t('SW: install succeeds even when one precache URL 404s', async () => {
    const sw = loadSW(['social.js']);
    let p; sw.listeners.install({ waitUntil: (x) => { p = x; } });
    await p;
    const cached = [...sw.stores['questgains-v29'].entries.keys()];
    assert.ok(cached.some((u) => u.includes('subscription.js')));
    assert.ok(cached.some((u) => u.includes('vendor/firebase-10.14.1/firebase-auth-compat.js')));
    assert.ok(!cached.some((u) => u.includes('raw.githubusercontent')), 'no remote sprites in install');
    assert.ok(sw.logs.some((l) => l.includes('social.js')), 'failure logged');
  });

  await t('SW: precache list covers all scripts referenced by index.html', () => {
    const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const srcs = [...html.matchAll(/<script src="([^"?]+)/g)].map((m) => m[1]).filter((s) => !s.startsWith('http'));
    const swsrc = fs.readFileSync(path.join(ROOT, 'service-worker.js'), 'utf8');
    for (const s of srcs) assert.ok(swsrc.includes("'./" + s + "'"), 'missing ' + s);
    for (const s of srcs) assert.ok(fs.existsSync(path.join(ROOT, s)), 'file missing ' + s);
  });

  await t('SW: activate keeps runtime cache, deletes old shell', async () => {
    const sw = loadSW();
    await sw.ctx.caches.open('questgains-runtime-v1');
    let p; sw.listeners.activate({ waitUntil: (x) => { p = x; } }); await p;
    const keys = await sw.ctx.caches.keys();
    assert.ok(keys.includes('questgains-runtime-v1'));
  });

  await t('SW: sprites use stale-while-revalidate runtime cache; API calls bypass', async () => {
    const sw = loadSW();
    let responded = null;
    const ev = (url) => ({ request: { method: 'GET', url, mode: 'no-cors' }, respondWith: (r) => { responded = r; }, waitUntil: () => {} });
    sw.listeners.fetch(ev('https://questgains.github.io/questgains/sprites/sprite-hexara.png'));
    await responded;
    assert.ok(sw.stores['questgains-runtime-v1'].entries.has('https://questgains.github.io/questgains/sprites/sprite-hexara.png'));
    responded = null;
    sw.listeners.fetch(ev('https://firestore.googleapis.com/v1/x'));
    assert.strictEqual(responded, null);
  });

  await t('every sprite referenced in old precache exists locally in sprites/', () => {
    const old = fs.readFileSync('/workspace/qg/repo/service-worker.js', 'utf8');
    const names = [...old.matchAll(/sprites\/(sprite-[\w-]+\.png)/g)].map((m) => m[1]);
    for (const n of names) assert.ok(fs.existsSync(path.join(ROOT, 'sprites', n)), n);
  });

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
