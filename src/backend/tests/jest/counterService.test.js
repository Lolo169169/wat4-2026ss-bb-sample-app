import counterService from '../../counterService.js';
import { beforeEach, expect, test } from '@jest/globals';

beforeEach(() => {
  expect.hasAssertions();
  counterService.update(0);
});

test("counterService to have value 0 and increment to 1", () => {
  const before = counterService.getValue();
  expect(before).toStrictEqual(0);

  counterService.increment();
  
  const after = counterService.getValue();
  expect(after).toStrictEqual(1);
});