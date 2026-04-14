import test from 'node:test';
import assert from 'node:assert';
import { requireFields } from '../../src/middleware/validate.middleware.js';

test('middleware exists', () => {
  assert.equal(typeof requireFields, 'function');
});