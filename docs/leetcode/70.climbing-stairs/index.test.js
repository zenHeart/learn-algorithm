import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('climbStairs', () => {
  let testData = {
    value1: [1, 1],
    value2: [2, 2],
    value3: [3, 3],
    value4: [45, 1836311903]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).toBe(data[1]);
    });
  }
});
