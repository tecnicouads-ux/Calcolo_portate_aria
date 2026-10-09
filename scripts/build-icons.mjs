import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const size = 1024;
const blue = '#0176BD';
const glyph = "M218,539 L219,551 L229,560 L424,560 L436,564 L446,573 L449,578 L452,594 L447,609 L438,618 L431,622 L417,624 L405,620 L393,609 L389,596 L384,591 L363,591 L357,596 L357,605 L360,616 L371,634 L389,649 L404,655 L425,657 L439,654 L452,648 L469,634 L482,610 L484,601 L484,583 L480,568 L475,558 L464,544 L453,536 L440,530 L421,527 L232,527 L225,530Z M506,430 L503,418 L495,403 L482,391 L462,382 L440,382 L421,389 L406,403 L398,417 L396,430 L402,436 L423,436 L428,431 L431,424 L441,416 L449,414 L460,416 L471,426 L474,435 L474,443 L467,456 L457,463 L173,463 L166,465 L161,470 L158,476 L158,484 L161,490 L169,496 L459,496 L467,494 L482,486 L498,469 L503,459 L506,447Z M552,350 L541,363 L538,375 L538,648 L539,655 L544,665 L553,674 L563,678 L782,678 L791,674 L803,661 L806,651 L806,372 L802,361 L793,351 L779,345 L566,345Z M692,586 L695,589 L695,641 L690,645 L652,644 L649,639 L650,589 L653,586Z M613,586 L617,591 L616,642 L612,645 L575,645 L571,641 L572,588 L574,586Z M715,578 L719,573 L770,573 L773,576 L774,590 L768,595 L718,594 L716,592Z M715,547 L720,541 L769,541 L773,544 L774,548 L773,560 L769,563 L720,563 L716,560Z M653,492 L691,492 L694,494 L695,547 L691,551 L655,551 L650,547 L649,502 L650,495Z M596,492 L612,492 L614,494 L615,515 L634,515 L637,518 L637,533 L634,536 L615,536 L614,557 L610,560 L599,560 L594,558 L593,536 L573,536 L571,534 L571,518 L574,515 L593,515 L593,495Z M571,383 L577,378 L767,378 L773,383 L774,386 L774,449 L768,456 L577,456 L571,451Z M372,370 L365,359 L352,349 L336,345 L319,347 L307,354 L300,361 L294,372 L294,381 L300,387 L320,387 L329,378 L336,378 L343,385 L343,394 L338,400 L331,402 L229,402 L223,405 L218,413 L218,423 L223,430 L233,434 L334,434 L347,431 L358,425 L373,405 L376,388Z";

await mkdir('assets', { recursive: true });

const iconOnly = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="#ffffff"/>
  <rect width="1024" height="1024" rx="185" ry="185" fill="${blue}"/>
  <path d="${glyph}" fill="#ffffff" fill-rule="evenodd"/>
</svg>`;

const foreground = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
  <path d="${glyph}" fill="#ffffff" fill-rule="evenodd"/>
</svg>`;

const background = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="${blue}"/>
</svg>`;

await sharp(Buffer.from(iconOnly)).png().toFile('assets/icon-only.png');
await sharp(Buffer.from(foreground)).png().toFile('assets/icon-foreground.png');
await sharp(Buffer.from(background)).png().toFile('assets/icon-background.png');

console.log('Icone Android generate dalla nuova icona Calcolo Portate Aria');
