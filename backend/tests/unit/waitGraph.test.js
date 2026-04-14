import test from 'node:test';
import assert from 'node:assert';
import { detectCycle } from '../../src/modules/deadlocks/waitGraph.js';

test('detects cycle', () => {
  assert.equal(detectCycle({ A:['B'], B:['A'] }), true);
});

test('no cycle', () => {
  assert.equal(detectCycle({ A:['B'], B:[] }), false);
});