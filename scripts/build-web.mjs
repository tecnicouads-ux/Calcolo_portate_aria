import { cp, mkdir, rm } from 'node:fs/promises';
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

console.log('Web assets copiati in www');
