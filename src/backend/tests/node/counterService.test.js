import counterService from '../../counterService.js';
import { beforeEach, suite, test } from 'node:test';
import assert from 'node:assert';

beforeEach(() => {
  counterService.update(0);
});

test("counterService to have value 0 and increment to 1", () => {
  const before = counterService.getValue();
  assert.strictEqual(before, 0);

  counterService.increment();
  
  const after = counterService.getValue();
  assert.strictEqual(after, 1);
});