import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('add binary', () => {
  let testData = {
    empty: [['', ''], ''],
    value1: [['11', '1'], '100'],
    value2: [['1010', '1011'], '10101'],
    value3: [['11', ''], '11']
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];
      let res = func(data[0][0], data[0][1]);
      expect(res).toBe(data[1]);
    });
  }
});
