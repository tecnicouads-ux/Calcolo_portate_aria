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


const calcButton = "<button class=\"btn-primary\" onclick=\"calcola()\">Calcola</button>";
if (!html.includes(calcButton)) {
  throw new Error('Pulsante Calcola non trovato.');
}
html = html.replace(calcButton, "<button class=\"btn-primary\" onclick=\"calcola()\">Calcola</button>\n  <button type=\"button\" onclick=\"resetCampi()\"\n    style=\"width:100%; padding:11px; border-radius:999px; font-size:15px; font-weight:700; background:#ffffff; color:#2A6EBB; border:1px solid #2A6EBB; margin-top:10px;\">\n    Reset\n  </button>");

const calcFunctionMarker = 'function calcola(){';
const resetFunction = `function resetCampi(){
  document.querySelectorAll('input[type="number"]').forEach(input => {
    input.value = '';
  });

  const outputs = ['areaOut','vEffOut','stdDNOut','stdDNVOut','rectSquareOut','squareSideOut'];
  outputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '—';
  });

  const tag = document.getElementById('vEffTag');
  if (tag) {
    tag.textContent = 'n/d';
    tag.className = 'tag tag-na';
  }

  const circOut = document.getElementById('circOut');
  const rectSquareRow = document.getElementById('rectSquareRow');
  const suggestCard = document.getElementById('suggestCard');

  if (circOut) circOut.style.display = 'none';
  if (rectSquareRow) rectSquareRow.style.display = 'none';
  if (suggestCard) suggestCard.style.display = 'none';

  if (document.activeElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calcola(){`;

if (!html.includes(calcFunctionMarker)) {
  throw new Error('Funzione calcola non trovata.');
}
html = html.replace(calcFunctionMarker, resetFunction);

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
