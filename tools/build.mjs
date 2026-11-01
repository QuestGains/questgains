// Optional, local-only minify step. Source files are NOT modified.
// Usage: cd tools && npm i && npm run build   → ../dist/ is a deployable copy of the site.
import { build } from 'esbuild';
import { cpSync, rmSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const JS = ['escape.js', 'firebase-config.js', 'db.js', 'username.js', 'subscription.js',
  'notifications.js', 'social.js', 'auth.js', 'data.js', 'app.js', 'service-worker.js'];
const COPY = ['index.html', 'style.css', 'manifest.json', 'logo.png', 'favicon.png', 'apple-touch-icon.png',
  'privacy.html', 'terms.html', 'privacy-policy.html', 'delete-account.html', 'vendor', 'sprites',
  'exercise-images', 'ex-imgs'];
rmSync(DIST, { recursive: true, force: true }); mkdirSync(DIST);
for (const f of COPY) { try { statSync(join(ROOT, f)); cpSync(join(ROOT, f), join(DIST, f), { recursive: true }); } catch {} }
// Classic scripts that share globals: no bundling, no renaming of top-level names.
await build({
  entryPoints: JS.map((f) => join(ROOT, f)), outdir: DIST, bundle: false,
  minifyWhitespace: true, minifySyntax: true, minifyIdentifiers: false,
  target: ['es2019', 'safari13'], legalComments: 'none', logLevel: 'info',
  drop: [], pure: ['console.log', 'console.debug', 'console.info'],
});
let before = 0, after = 0;
for (const f of JS) { before += statSync(join(ROOT, f)).size; after += statSync(join(DIST, f)).size; }
console.log(`JS: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
