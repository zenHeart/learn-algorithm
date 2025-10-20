import func from './index.js';
import { expect } from 'vitest';

describe.skip('same-tree', function () {
  let testData = {
    empty: [
      [
        [1, 2, 3, 0, 0, 0],
        [2, 5, 6]
      ],
      [1, 2, 2, 3, 5, 6]
    ],
    value1: [
      [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
      [1, 2, 2, 3, 5, 6]
    ]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function () {
      let data = testData[unitTestName];

      let res = func(data[0][0], data[0][1], data[0][2], data[0][3]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
