import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('实现 strStr()', () => {
  let testData = {
    value1: [[], -2147483648],
    value2: [[-5], -5],
    value3: [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 6]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).toEqual(data[1]);
    });
  }
});
