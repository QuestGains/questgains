// Local build. Source JS is not overwritten (Pages serves the repo root, and these
// files stay readable). Tailwind is compiled into ../qg.css, which IS served.
// Usage: cd tools && npm i && npm run build
//   → refreshes ../qg.css and writes a minified copy of the site to ../dist/
import { build } from 'esbuild';
import { cpSync, rmSync, mkdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const TOOLS = dirname(fileURLToPath(import.meta.url));
const ROOT = join(TOOLS, '..');
const DIST = join(ROOT, 'dist');
const JS = ['escape.js', 'firebase-config.js', 'db.js', 'username.js', 'subscription.js',
  'notifications.js', 'social.js', 'auth.js', 'data.js', 'app.js', 'service-worker.js'];
const COPY = ['index.html', 'manifest.json', 'logo.png', 'favicon.png', 'apple-touch-icon.png',
  'privacy.html', 'terms.html', 'privacy-policy.html', 'delete-account.html', 'vendor', 'sprites',
  'exercise-images', 'ex-imgs'];

const compiledPath = join(ROOT, 'qg.css');
execSync('npx tailwindcss -c ./tailwind.config.js -i ./tailwind-input.css -o /tmp/qg-tw.css --minify', {
  cwd: TOOLS, stdio: 'inherit'
});
const qgCss = '/* QuestGains compiled Tailwind plus style.css. Rebuild with: cd tools && npm run build */\n'
  + readFileSync('/tmp/qg-tw.css', 'utf8') + '\n' + readFileSync(join(ROOT, 'style.css'), 'utf8');
writeFileSync(compiledPath, qgCss);

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST);
for (const f of COPY) {
  try { statSync(join(ROOT, f)); cpSync(join(ROOT, f), join(DIST, f), { recursive: true }); } catch {}
}
writeFileSync(join(DIST, 'qg.css'), qgCss);

// Classic scripts that share globals: no bundling, no renaming of top-level names.
await build({
  entryPoints: JS.map((f) => join(ROOT, f)),
  outdir: DIST,
  bundle: false,
  minifyWhitespace: true,
  minifySyntax: true,
  minifyIdentifiers: false,
  target: ['es2019', 'safari13'],
  legalComments: 'none',
  logLevel: 'info',
  drop: [],
  pure: ['console.log', 'console.debug', 'console.info'],
});

let before = 0, after = 0;
for (const f of JS) {
  before += statSync(join(ROOT, f)).size;
  after += statSync(join(DIST, f)).size;
}
console.log(`JS: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB (identifiers kept; output in dist/)`);
console.log(`CSS: qg.css ${(statSync(compiledPath).size / 1024).toFixed(0)} KB (replaces the Tailwind CDN)`);
