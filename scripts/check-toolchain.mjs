#!/usr/bin/env node
/**
 * Checks that the running Node and npm satisfy `engines` in package.json, and
 * that `.nvmrc` agrees with it. package.json is the single source of truth: the
 * required versions are read from it, never written here, so a fleet Node bump
 * only has to change package.json and .nvmrc.
 *
 * Only the major version is compared, which is all `engines` here expresses
 * (e.g. `"node": ">=26"`, `"npm": ">=11 <12"`).
 */

import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const root = new URL('../', import.meta.url);

/** Whether a major version satisfies a space-separated list of comparators such as ">=11 <12". */
export function satisfiesMajor(major, range) {
  return range
    .trim()
    .split(/\s+/)
    .every((comparator) => {
      const match = /^(>=|<=|>|<|=)?v?(\d+)/.exec(comparator);
      if (!match) {
        return true;
      }
      const bound = Number(match[2]);
      switch (match[1]) {
        case '>=':
          return major >= bound;
        case '<=':
          return major <= bound;
        case '>':
          return major > bound;
        case '<':
          return major < bound;
        default:
          return major === bound;
      }
    });
}

/**
 * Problems with the given toolchain against package.json engines and .nvmrc.
 * Empty when everything agrees.
 */
export function toolchainErrors({ engines = {}, nodeVersion, npmMajor, nvmrc }) {
  const errors = [];
  const nodeMajor = Number(nodeVersion.split('.')[0]);
  if (engines.node && !satisfiesMajor(nodeMajor, engines.node)) {
    errors.push(`Node ${engines.node} is required (package.json engines); found ${nodeVersion}.`);
  }
  // npm is only known when the script runs through `npm run`.
  if (engines.npm && npmMajor !== undefined && !satisfiesMajor(npmMajor, engines.npm)) {
    errors.push(`npm ${engines.npm} is required (package.json engines); found ${npmMajor}.x.`);
  }
  const nvmrcMajor = nvmrc ? Number(/^v?(\d+)/.exec(nvmrc)?.[1]) : Number.NaN;
  if (engines.node && !Number.isNaN(nvmrcMajor) && !satisfiesMajor(nvmrcMajor, engines.node)) {
    errors.push(`.nvmrc (${nvmrc}) does not satisfy package.json engines.node (${engines.node}); update one of them.`);
  }
  return errors;
}

/** Reads `.nvmrc`, or undefined if there is none. */
export function readNvmrc() {
  try {
    return readFileSync(new URL('.nvmrc', root), 'utf8').trim();
  } catch {
    return undefined;
  }
}

/** package.json `engines`. */
export function readEngines() {
  return JSON.parse(readFileSync(new URL('package.json', root), 'utf8')).engines ?? {};
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const npmMatch = /(?:^|\s)npm\/(\d+)/.exec(process.env.npm_config_user_agent ?? '');
  const npmMajor = npmMatch ? Number(npmMatch[1]) : undefined;
  const errors = toolchainErrors({
    engines: readEngines(),
    nodeVersion: process.versions.node,
    npmMajor,
    nvmrc: readNvmrc(),
  });
  if (errors.length) {
    console.error(`${errors.join('\n')}\nRun \`nvm use\` in the project directory, then retry.`);
    process.exit(1);
  }
  console.log(`Toolchain valid: Node ${process.versions.node}${npmMajor ? `, npm ${npmMajor}.x` : ''}.`);
}
