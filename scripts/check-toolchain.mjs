#!/usr/bin/env node

const requiredNode = 22;
const requiredNpm = 10;
const nodeMajor = Number(process.versions.node.split('.')[0]);
const npmAgent = process.env.npm_config_user_agent ?? '';
const npmMatch = /(?:^|\s)npm\/(\d+)/.exec(npmAgent);
const npmMajor = npmMatch ? Number(npmMatch[1]) : undefined;
const errors = [];

if (nodeMajor !== requiredNode) {
  errors.push(`Node ${requiredNode}.x is required; found ${process.versions.node}.`);
}
if (npmMajor !== undefined && npmMajor !== requiredNpm) {
  errors.push(`npm ${requiredNpm}.x is required; found ${npmMajor}.x.`);
}

if (errors.length) {
  console.error(`${errors.join('\n')}\nRun \`nvm use\` in the project directory, then retry.`);
  process.exit(1);
}

console.log(`Toolchain valid: Node ${process.versions.node}${npmMajor ? `, npm ${npmMajor}.x` : ''}.`);
