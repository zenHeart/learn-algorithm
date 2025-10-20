import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('two-sum-ii-input-array-is-sorted', () => {
  let testData = {
    empty: [[[], 0], []],
    value1: [
      [[2, 7, 11, 15], 9],
      [1, 2]
    ],
    value2: [
      [[-3, 2, 7, 11, 15], 4],
      [1, 3]
    ],
    value3: [
      [[0, 0, 3, 4], 0],
      [1, 2]
    ]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data[0][0], data[0][1]);
      expect(res).toEqual(data[1]);
    });
  }
});
