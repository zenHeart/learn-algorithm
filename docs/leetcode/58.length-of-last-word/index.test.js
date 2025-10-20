import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('实现 strStr()', () => {
  let testData = {
    empty: ['', 0],
    value1: ['Hello World', 5],
    value2: ['Hello World ', 5],
    value3: ['b   a    ', 1]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).toEqual(data[1]);
    });
  }
});
