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

const newHeader = `<header>
  <img src="app-header-icon.png" class="app-logo" alt="Calcolo Portate Aria">
  <div class="app-title">Calcolo Portate Aria</div>
</header>`;

const headerPattern = /<a\s+href=["']https:\/\/www\.airdistributionsystems\.it\/home\.php["'][^>]*>\s*<header>[\s\S]*?<img\s+src=["']logo\.png["']\s+class=["']app-logo["'][^>]*>[\s\S]*?<div\s+class=["']app-title["']>\s*Calcolo Portate Aria\s*<\/div>[\s\S]*?<div\s+class=["']app-subtitle["']>\s*Air Distribution Systems\s*<\/div>[\s\S]*?<\/header>\s*<\/a>/i;

if (!headerPattern.test(html)) {
  throw new Error('Header ADS originale non trovato: nessuna modifica applicata.');
}

html = html.replace(headerPattern, newHeader);

const privacyFooter = `
<div style="text-align:center; padding:18px 12px 28px; font-size:13px;">
  <a href="https://tecnicouads-ux.github.io/Calcolo_portate_aria/privacy.html"
     target="_blank"
     rel="noopener noreferrer"
     style="color:#2A6EBB; text-decoration:underline;">Privacy Policy</a>
</div>
`;

const scriptMarker = '<!-- ===================== SCRIPT ===================== -->';
if (!html.includes(scriptMarker)) {
  throw new Error('Punto di inserimento Privacy Policy non trovato.');
}
html = html.replace(scriptMarker, privacyFooter + '\n' + scriptMarker);

await writeFile(androidIndexPath, html, 'utf8');

console.log('Web assets Android creati con icona app, header pulito e Privacy Policy');
