import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const out = join(root, 'www');

const files = [
  'index.html',
  'manifest.json',
  'logo-app.png',
  'logo.png',
  'rounded_favicon_16.png',
  'rounded_favicon_32.png',
  'rounded_icon_180.png',
  'rounded_icon_192.png',
  'rounded_icon_256.png',
  'rounded_icon_384.png',
  'rounded_icon_512.png'
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const file of files) {
  await cp(join(root, file), join(out, file));
}

// Modifiche SOLO per il pacchetto Android: la webapp sorgente resta intatta.
await cp(join(root, 'assets', 'icon-only.png'), join(out, 'app-header-icon.png'));

const androidIndexPath = join(out, 'index.html');
let html = await readFile(androidIndexPath, 'utf8');

const oldHeader = `<a href="https://www.airdistributionsystems.it/home.php" target="_blank" style="text-decoration:none; color:inherit;">
<header>
  <img src="logo.png" class="app-logo">
  <div>
    <div class="app-title">Calcolo Portate Aria</div>
    <div class="app-subtitle">Air Distribution Systems</div>
  </div>
</header>
</a>`;

const newHeader = `<header>
  <img src="app-header-icon.png" class="app-logo" alt="Calcolo Portate Aria">
  <div class="app-title">Calcolo Portate Aria</div>
</header>`;

if (!html.includes(oldHeader)) {
  throw new Error('Header originale non trovato: nessuna modifica applicata.');
}

html = html.replace(oldHeader, newHeader);
await writeFile(androidIndexPath, html, 'utf8');

console.log('Web assets Android creati in www con header app dedicato');
