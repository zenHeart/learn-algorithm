import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('实现 strStr()', () => {
  let testData = {
    empty: [['', ''], 0],
    value1: [['hello', 'll'], 2],
    value2: [['aaaaa', 'bba'], -1]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data[0][0], data[0][1]);
      expect(res).toEqual(data[1]);
    });
  }
});
