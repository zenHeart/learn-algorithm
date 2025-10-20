import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('remove element', () => {
  let testData = {
    empty: [[[], 0], 0],
    value1: [[[0, 0, 1, 1, 2, 2], 0], 4]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data[0][0], data[0][1]);
      expect(res).toEqual(data[1]);
    });
  }
});
