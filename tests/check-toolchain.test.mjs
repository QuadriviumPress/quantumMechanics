import assert from 'node:assert/strict';
import test from 'node:test';
import { readEngines, readNvmrc, satisfiesMajor, toolchainErrors } from '../scripts/check-toolchain.mjs';

test('satisfiesMajor handles the ranges package.json uses', () => {
  assert.equal(satisfiesMajor(26, '>=26'), true);
  assert.equal(satisfiesMajor(22, '>=26'), false);
  assert.equal(satisfiesMajor(11, '>=11 <12'), true);
  assert.equal(satisfiesMajor(10, '>=11 <12'), false);
  assert.equal(satisfiesMajor(12, '>=11 <12'), false);
  assert.equal(satisfiesMajor(26, '26'), true);
});

test('this repository is consistent: .nvmrc satisfies engines.node', () => {
  const engines = readEngines();
  const nvmrc = readNvmrc();
  assert.ok(engines.node, 'package.json declares engines.node');
  assert.deepEqual(
    toolchainErrors({ engines, nodeVersion: `${nvmrc ?? '0'}.0.0`, npmMajor: undefined, nvmrc }),
    [],
  );
});

test('reports a wrong Node, a wrong npm, and a stale .nvmrc', () => {
  const engines = { node: '>=26', npm: '>=11 <12' };
  const errors = toolchainErrors({ engines, nodeVersion: '22.4.0', npmMajor: 10, nvmrc: '22' });
  assert.equal(errors.length, 3);
  assert.deepEqual(toolchainErrors({ engines, nodeVersion: '26.13.0', npmMajor: 11, nvmrc: '26' }), []);
});
