import func from './index.js';
const {
  createListWithArray
} = require('../../data-structures/02.list/LinkedList.js');
import { describe, it, expect } from 'vitest';

describe('longest-common-prefix', function () {
  let testData = {
    empty: [[[], []], []],
    value1: [
      [
        [1, 2, 4],
        [1, 3, 4]
      ],
      [1, 1, 2, 3, 4, 4]
    ]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function () {
      let data = testData[unitTestName];

      let l1 = createListWithArray(data[0][0]);
      let l2 = createListWithArray(data[0][1]);
      let expectRes = createListWithArray(data[1]);

      let res = func(l1, l2);
      expect(res).toEqual(expectRes);
    });
  }
});
