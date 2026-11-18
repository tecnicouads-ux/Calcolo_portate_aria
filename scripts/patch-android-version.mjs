import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const file = join(process.cwd(), 'android', 'app', 'build.gradle');
let gradle = await readFile(file, 'utf8');

if (!/versionCode\s+\d+/.test(gradle) || !/versionName\s+"[^"]+"/.test(gradle)) {
  throw new Error('Versione Android non trovata in build.gradle');
}

gradle = gradle
  .replace(/versionCode\s+\d+/, 'versionCode 2')
  .replace(/versionName\s+"[^"]+"/, 'versionName "1.0.1"');

await writeFile(file, gradle, 'utf8');
console.log('Versione Android impostata: versionCode 2, versionName 1.0.1');
