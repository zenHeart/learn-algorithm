import func from './index.js';
import { describe, it, expect } from 'vitest';

describe.skip('majority element', function() {
  let testData = {
    empty: [[[], 3], []],
    value1: [
      [[1, 2, 3, 4, 5, 6, 7], 3],
      [5, 6, 7, 1, 2, 3, 4]
    ],
    value2: [
      [[-1, -100, 3, 99], 2],
      [3, 99, -1, -100]
    ],
    value3: [
      [[1, 2, 3, 4, 5, 6, 7], 3],
      [5, 6, 7, 1, 2, 3, 4]
    ]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      func(data[0][0], data[0][1]);
      expect(data[0][0]).toEqual(data[1]);
    });
  }
});
