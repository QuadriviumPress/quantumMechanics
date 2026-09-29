#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from 'yaml';

export function chapterLists(source) {
  const project = parse(source).project;
  const chapters = entries => (entries ?? []).flatMap(entry => [
    ...(entry.file?.startsWith('chapters/') ? [entry.file] : []),
    ...chapters(entry.children),
  ]);
  return {
    toc: chapters(project.toc),
    exports: chapters(project.exports?.find(entry => entry.id === 'book')?.articles),
  };
}

// Track nested directives and ordinary code fences, including MyST's colon
// fences. Examples inside ordinary code blocks are not actual figures.
export function figuresWithoutAlt(source) {
  const stack = [];
  const missing = [];
  for (const line of source.split(/\r?\n/)) {
    const match = /^ {0,3}(`{3,}|~{3,}|:{3,})(.*)$/.exec(line);
    const top = stack.at(-1);
    if (match) {
      const [, fence, rest] = match;
      if (top && !rest.trim() && fence[0] === top.char && fence.length >= top.length) {
        stack.pop();
        if (top.figure && !top.alt) missing.push(top.figure);
      } else if (!top?.code) {
        const directive = /^\s*\{([^}]+)\}\s*(.*)$/.exec(rest);
        if (rest.trim() || fence[0] !== ':') stack.push({
          char: fence[0], length: fence.length,
          code: !directive, figure: directive?.[1] === 'figure' ? directive[2] : null,
          alt: false,
        });
      }
    } else if (top?.figure && /^\s*:alt:\s*\S+/.test(line)) {
      top.alt = true;
    }
  }
  for (const entry of stack) if (entry.figure && !entry.alt) missing.push(entry.figure);
  return missing;
}

function main() {
  const root = path.resolve(import.meta.dirname, '..');
  const config = fs.readFileSync(path.join(root, 'myst.yml'), 'utf8');
  const failures = [];
  const lists = chapterLists(config);
  const tocChapters = lists.toc;
  const chapterFiles = fs.readdirSync(path.join(root, 'chapters'))
    .filter(name => /^ch-\d{2}-.+\.md$/.test(name))
    .sort()
    .map(name => `chapters/${name}`);
  const exportChapters = lists.exports;

  if (JSON.stringify(tocChapters) !== JSON.stringify(chapterFiles)) {
    failures.push(`website TOC chapters differ from the chapter directory\n` +
      `  expected ${JSON.stringify(chapterFiles)}\n  found    ${JSON.stringify(tocChapters)}`);
  }
  if (JSON.stringify(exportChapters) !== JSON.stringify(chapterFiles)) {
    failures.push(`print export chapters differ from the chapter directory\n` +
      `  expected ${JSON.stringify(chapterFiles)}\n  found    ${JSON.stringify(exportChapters)}`);
  }

  const labels = new Map();
  for (const relative of fs.readdirSync(path.join(root, 'chapters')).filter(name => name.endsWith('.md'))) {
    const file = path.join('chapters', relative);
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    for (const [, label] of source.matchAll(/^:(?:label|name):\s*(\S+)/gm)) {
      if (labels.has(label)) failures.push(`duplicate label ${label}: ${labels.get(label)} and ${file}`);
      labels.set(label, file);
    }
    for (const figure of figuresWithoutAlt(source)) {
      failures.push(`${file}: figure ${figure} has no :alt:`);
    }
  }

  if (failures.length) {
    console.error(failures.map(item => `ERROR: ${item}`).join('\n'));
    process.exit(1);
  }
  console.log(`Project metadata valid: ${chapterFiles.length} chapters, ${labels.size} directive labels.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
