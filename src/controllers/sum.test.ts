import { expect, test } from '@jest/globals';
import sum from './sum';

/*TODO: this is just a test - remove once we've implemented real tests.*/
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
