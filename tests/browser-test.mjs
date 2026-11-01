// Headless Chromium checks. Run: node tests/browser-test.mjs  (server must serve the package at /questgains/ and dist at /qgdist/)
// All non-localhost requests are stubbed: Tailwind CDN → empty script; Firebase/Google APIs & anything else → aborted.
import { chromium } from 'playwright';
const BASE = process.env.BASE || 'http://localhost:8765';
let pass = 0, fail = 0;
const t = async (n, f) => { try { await f(); pass++; console.log('ok  ', n); } catch (e) { fail++; console.log('FAIL', n, '\n    ', e.message.split('\n')[0]); } };
const assert = (c, m) => { if (!c) throw new Error(m); };

async function newCtx(browser, { fail404 = [] } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: 'allow' });
  await ctx.route('**/*', (route) => {
    const u = route.request().url();
    if (fail404.some((f) => u.includes(f))) return route.fulfill({ status: 404, body: 'nope' });
    if (u.startsWith(BASE)) return route.continue();
    if (u.includes('cdn.tailwindcss.com')) return route.fulfill({ status: 200, contentType: 'application/javascript', body: '/* tailwind stub */' });
    return route.abort();
  });
  return ctx;
}
async function open(ctx, path) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(BASE + path, { waitUntil: 'load' });
  return { page, errors };
}
async function waitSW(page) {
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, { timeout: 15000 }).catch(async () => { await page.reload(); });
}

const browser = await chromium.launch();

await t('(a) SW installs; offline reload loads app shell with no script errors', async () => {
  const ctx = await newCtx(browser);
  const { page, errors } = await open(ctx, '/questgains/');
  await waitSW(page);
  const keys = await page.evaluate(() => caches.keys());
  assert(keys.includes('questgains-v29'), 'cache v29 missing: ' + keys);
  const n = await page.evaluate(async () => (await (await caches.open('questgains-v29')).keys()).length);
  assert(n >= 20, 'precached entries ' + n);
  await ctx.setOffline(true);
  errors.length = 0;
  await page.reload({ waitUntil: 'load' });
  const ok = await page.evaluate(() => !!document.getElementById('login-overlay') && typeof window.escapeHTML === 'function' && typeof firebase !== 'undefined' && typeof renderLeaderboard === 'function');
  assert(ok, 'shell/scripts not loaded offline');
  assert(errors.length === 0, 'page errors: ' + errors.join(' | '));
  await ctx.close();
});

await t('(b) install succeeds when a sprite 404s AND a precache file 404s', async () => {
  const ctx = await newCtx(browser, { fail404: ['sprites/sprite-hexara.png', 'social.js'] });
  const { page } = await open(ctx, '/questgains/');
  await waitSW(page);
  const state = await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).active?.state);
  assert(state === 'activated', 'sw state ' + state);
  // sprite 404 at runtime does not break anything
  const st = await page.evaluate(async () => (await fetch('sprites/sprite-hexara.png')).status);
  assert(st === 404, 'sprite status ' + st);
  const st2 = await page.evaluate(async () => (await fetch('sprites/sprite-aegis-ward.png')).status);
  assert(st2 === 200, 'good sprite ' + st2);
  await page.waitForTimeout(700);
  const cached = await page.evaluate(async () => !!(await (await caches.open('questgains-runtime-v1')).match(new URL('sprites/sprite-aegis-ward.png', location.href).href)));
  assert(cached, 'sprite not cached on first use');
  await ctx.close();
});

const EVIL = '<img src=x onerror="window.__xss=(window.__xss||0)+1">';
const EVIL_ID = "x');window.__xss=(window.__xss||0)+1;('";
async function xssChecks(path, label) {
  await t(`(c) ${label}: friend list, friend requests, leaderboard, barcode card escape hostile data`, async () => {
    const ctx = await newCtx(browser);
    const { page, errors } = await open(ctx, path);
    const res = await page.evaluate(async ({ EVIL, EVIL_ID }) => {
      const mkDoc = (id, data) => ({ id, exists: true, data: () => data });
      const coll = (arr) => ({ empty: !arr.length, docs: arr, forEach: (f) => arr.forEach(f), size: arr.length });
      const userData = { profile: { username: EVIL }, character: { xp: 1234, level: 7 } };
      const q = { get: async () => coll([mkDoc('u2', userData)]) };
      const chain = new Proxy({}, { get: (_, k) => k === 'get' ? q.get : () => chain });
      window.db = {
        collection: (name) => ({
          ...chain,
          orderBy: () => chain, where: () => chain, limit: () => chain, get: q.get,
          doc: (id) => ({
            get: async () => mkDoc(id, userData),
            collection: () => ({
              where: () => ({ limit: () => ({ get: async () => coll([mkDoc(EVIL_ID, { username: EVIL, status: 'pending' })]) }) }),
              limit: () => ({ get: async () => coll([mkDoc('u2', {})]) }),
              doc: () => ({ get: async () => ({ exists: false, data: () => ({}) }) }),
            }),
          }),
        }),
      };
      window.currentUserId = 'me'; window.currentUsername = 'me';
      const ensure = (id) => { if (!document.getElementById(id)) { const d = document.createElement('div'); d.id = id; document.body.appendChild(d); } };
      ['friend-requests-container', 'friends-leaderboard-list', 'leaderboard-list'].forEach(ensure);
      let accepted = null; window.acceptFriendRequest = (id) => { accepted = id; };
      await window.renderFriendRequests();
      await window.renderFriendsLeaderboard();
      try { await renderLeaderboard(); } catch (e) { return { err: 'renderLeaderboard ' + e.message }; }
      showScannedFoodConfirmation({ name: EVIL, brand: EVIL, basisLabel: EVIL, caloriesPer: EVIL, proteinPer: 1, carbsPer: 1, fatPer: 1, servingQty: '1" onfocus="window.__xss=1', servingLabel: EVIL });
      document.querySelector('[data-act="accept"]')?.click();
      await new Promise((r) => setTimeout(r, 300));
      const imgs = [...document.querySelectorAll('img[src="x"]')].length;
      const shown = ['friend-requests-container', 'friends-leaderboard-list', 'leaderboard-list', 'scan-confirm']
        .map((id) => (document.getElementById(id)?.textContent || '').includes(EVIL));
      return { xss: window.__xss || 0, imgs, shown, accepted };
    }, { EVIL, EVIL_ID });
    assert(!res.err, res.err);
    assert(res.xss === 0, 'script executed: ' + res.xss);
    assert(res.imgs === 0, 'injected <img> count ' + res.imgs);
    assert(res.shown.every(Boolean), 'hostile text not rendered as text in all 4 paths: ' + res.shown);
    assert(res.accepted === EVIL_ID, 'accept handler got wrong id: ' + res.accepted);
    assert(errors.length === 0, 'page errors: ' + errors.join(' | '));
    await ctx.close();
  });
}
await xssChecks('/questgains/', 'source');

await t('(e) purchase buttons reset on onIAPCancelled / onIAPError', async () => {
  const ctx = await newCtx(browser);
  const { page } = await open(ctx, '/questgains/');
  const r = await page.evaluate(async () => {
    // simulate native iOS bridge (current builds' handler names)
    window.webkit = { messageHandlers: { 'iap-purchase': { postMessage: () => {} }, 'iap-restore': { postMessage: () => {} } } };
    window.currentUserId = 'me';
    await window.initSubscription?.('me').catch?.(() => {});
    window.onIAPCancelled || (await window.initSubscription('me'));
    const b = document.getElementById('paywall-cta-btn');
    const label = b.textContent;
    await window.openUpgradeFlow('monthly');
    const during = [b.disabled, b.textContent];
    window.onIAPCancelled();
    const afterCancel = [b.disabled, b.textContent === label];
    await window.openUpgradeFlow('annual');
    window.onIAPError('boom');
    const afterErr = [b.disabled, b.textContent === label, !!document.querySelector('.qg-toast')];
    return { during, afterCancel, afterErr };
  });
  assert(r.during[0] === true && r.during[1] === 'Processing…', 'not loading: ' + r.during);
  assert(r.afterCancel[0] === false && r.afterCancel[1], 'cancel did not reset');
  assert(r.afterErr[0] === false && r.afterErr[1] && r.afterErr[2], 'error did not reset/toast');
  await ctx.close();
});

await t('(d) minified dist/ loads with no script errors', async () => {
  const ctx = await newCtx(browser);
  const { page, errors } = await open(ctx, '/qgdist/');
  const ok = await page.evaluate(() => !!document.getElementById('login-overlay') && typeof window.escapeHTML === 'function' && typeof renderLeaderboard === 'function' && typeof window.renderFriendsLeaderboard === 'function');
  assert(ok, 'dist globals missing');
  assert(errors.length === 0, 'page errors: ' + errors.join(' | '));
  await ctx.close();
});
await xssChecks('/qgdist/', 'dist');

await browser.close();
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
