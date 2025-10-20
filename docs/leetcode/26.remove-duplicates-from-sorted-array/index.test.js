import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('longest-common-prefix', () => {
  let testData = {
    empty: [[], 0],
    value1: [[0, 0, 1, 1, 2, 2], 3]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).toEqual(data[1]);
    });
  }
});
