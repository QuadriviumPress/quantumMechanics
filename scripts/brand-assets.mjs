/**
 * Social card and favicon for the Quantum Mechanics site.
 *
 * The header logos are hand-written SVG. This script only rasterizes the
 * preview card and the multi-size favicon MyST copies to /favicon.ico.
 *
 * Regenerate with: node scripts/brand-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const images = path.join(root, 'images');
const logo = fs.readFileSync(path.join(images, 'logo.svg'));

const card = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect width="1200" height="11" fill="#5b4bb7"/>
  <text x="72" y="250" font-family="DejaVu Sans, Liberation Sans, sans-serif" font-size="52" font-weight="700" fill="#5b4bb7">Quantum Mechanics</text>
  <text x="78" y="320" font-family="DejaVu Sans, Liberation Sans, sans-serif" font-size="28" fill="#333333">A Spins-First, Experimental Approach</text>
  <line x1="78" y1="370" x2="210" y2="370" stroke="#d28a00" stroke-width="4"/>
  <text x="78" y="450" font-family="DejaVu Sans, Liberation Sans, sans-serif" font-size="18" fill="#555555">QuadriviumPress  ·  Open textbook  ·  CC BY-SA 4.0</text>
</svg>
`;

const logoPng = await sharp(logo).resize(280, 280).png().toBuffer();
await sharp(Buffer.from(card))
  .composite([{ input: logoPng, left: 880, top: 160 }])
  .png()
  .toFile(path.join(images, 'social-card.png'));

const sizes = [16, 32, 48, 64, 128, 256];
const pngs = await Promise.all(sizes.map(size => sharp(logo).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = 6 + pngs.length * 16;
const entries = pngs.map((png, index) => {
  const size = sizes[index];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0);
  entry.writeUInt8(size === 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += png.length;
  return entry;
});
fs.writeFileSync(path.join(images, 'favicon.ico'), Buffer.concat([header, ...entries, ...pngs]));
console.log('Wrote images/social-card.png and images/favicon.ico');
