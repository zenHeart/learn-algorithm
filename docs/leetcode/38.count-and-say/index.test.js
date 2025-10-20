import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('实现 strStr()', () => {
  let testData = {
    value1: [1, '1'],
    value2: [2, '11'],
    value3: [3, '21'],
    value4: [4, '1211'],
    value5: [5, '111221'],
    value6: [6, '312211']
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).toEqual(data[1]);
    });
  }
});
