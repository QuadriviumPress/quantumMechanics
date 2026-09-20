import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { parseDocument } from 'yaml';

const hash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const editions = [
  ['quantum-mechanics.pdf', 'PDF with worked solutions'],
  ['quantum-mechanics-student.pdf', 'PDF with exercises only'],
  ['quantum-mechanics.docx', 'Word edition'],
];

export function writeMetadata(root) {
  const directory = path.join(root, 'exports');
  const files = Object.fromEntries(fs.readdirSync(directory)
    .filter(name => /\.(pdf|docx)$/.test(name))
    .map(name => [name, hash(path.join(directory, name))]));
  for (const [name] of editions) if (!files[name]) throw new Error(`Missing edition: ${name}`);
  const metadata = {
    revision: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
    built_at: new Date().toISOString(),
    files,
  };
  fs.writeFileSync(path.join(directory, 'metadata.json'), JSON.stringify(metadata, null, 2) + '\n');
}

export function prepareDownloads(root) {
  const directory = path.join(root, 'exports');
  let metadata;
  try {
    metadata = JSON.parse(fs.readFileSync(path.join(directory, 'metadata.json'), 'utf8'));
    if (!/^[a-f0-9]{40}$/.test(metadata.revision) || !/^\d{4}-\d{2}-\d{2}T/.test(metadata.built_at)
      || !Number.isFinite(Date.parse(metadata.built_at))) metadata = undefined;
  } catch { metadata = undefined; }
  const configPath = path.join(root, 'myst.yml');
  const config = parseDocument(fs.readFileSync(configPath, 'utf8'));
  if (config.errors.length) throw config.errors[0];
  const lines = [];
  for (const [name, title] of editions) {
    const file = path.join(directory, name);
    if (!fs.existsSync(file)) continue;
    const verified = metadata?.files?.[name] === hash(file);
    const date = verified ? metadata.built_at.slice(0, 10) : undefined;
    const description = date ? `exported ${date}, revision ${metadata.revision.slice(0, 7)}` : 'export date and revision unavailable';
    lines.push(`- [${title}](exports/${name}) — ${description}.`);
    const downloads = config.getIn(['project', 'downloads']);
    for (const entry of downloads?.items ?? []) {
      if (entry.get('file') === `exports/${name}`) entry.set('title', `${title} (${description})`);
    }
  }
  const indexPath = path.join(root, 'index.md');
  const source = fs.readFileSync(indexPath, 'utf8');
  const marker = /<!-- export-downloads:start -->[\s\S]*?<!-- export-downloads:end -->/;
  if (!marker.test(source)) throw new Error('Missing download metadata markers in index.md');
  const content = lines.length
    ? `The website may contain changes made after these downloadable editions were exported.\n\n${lines.join('\n')}`
    : 'Downloadable editions are not available in this build.';
  fs.writeFileSync(indexPath, source.replace(marker, `<!-- export-downloads:start -->\n${content}\n<!-- export-downloads:end -->`));
  fs.writeFileSync(configPath, config.toString());
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const root = path.resolve(import.meta.dirname, '..');
  if (process.argv[2] === 'write') writeMetadata(root);
  else if (process.argv[2] === 'prepare') prepareDownloads(root);
  else throw new Error('Usage: node scripts/export-metadata.mjs write|prepare');
}
