import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { parse } from 'yaml';
import { prepareDownloads } from '../scripts/export-metadata.mjs';

test('downloads show verified provenance and never date a mismatched or legacy file', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'export-metadata-'));
  try {
    fs.mkdirSync(path.join(root, 'exports'));
    fs.writeFileSync(path.join(root, 'index.md'), '<!-- export-downloads:start -->\n<!-- export-downloads:end -->');
    fs.writeFileSync(path.join(root, 'myst.yml'), 'project:\n  downloads:\n    - file: exports/quantum-mechanics.pdf\n      title: Book\n');
    fs.writeFileSync(path.join(root, 'exports/quantum-mechanics.pdf'), 'pdf fixture');
    fs.writeFileSync(path.join(root, 'exports/metadata.json'), JSON.stringify({
      revision: 'a'.repeat(40), built_at: '2026-09-05T12:00:00.000Z',
      files: { 'quantum-mechanics.pdf': createHash('sha256').update('pdf fixture').digest('hex') },
    }));
    prepareDownloads(root);
    assert.match(fs.readFileSync(path.join(root, 'index.md'), 'utf8'), /exported 2026-09-05, revision aaaaaaa/);
    assert.match(parse(fs.readFileSync(path.join(root, 'myst.yml'), 'utf8')).project.downloads[0].title, /2026-09-05/);
    fs.writeFileSync(path.join(root, 'exports/quantum-mechanics.pdf'), 'different export');
    prepareDownloads(root);
    assert.match(fs.readFileSync(path.join(root, 'index.md'), 'utf8'), /date and revision unavailable/);
    fs.unlinkSync(path.join(root, 'exports/metadata.json'));
    prepareDownloads(root);
    assert.doesNotMatch(fs.readFileSync(path.join(root, 'index.md'), 'utf8'), /2026-09-05/);
    fs.unlinkSync(path.join(root, 'exports/quantum-mechanics.pdf'));
    prepareDownloads(root);
    assert.match(fs.readFileSync(path.join(root, 'index.md'), 'utf8'), /not available/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
