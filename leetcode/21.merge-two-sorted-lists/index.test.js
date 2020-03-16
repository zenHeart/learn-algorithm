const func = require('./index');
const {
  createListWithArray
} = require('../../data-structures/list/LinkedList');
const { expect } = require('chai');

describe('longest-common-prefix', function() {
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
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let l1 = createListWithArray(data[0][0]);
      let l2 = createListWithArray(data[0][1]);
      let expectRes = createListWithArray(data[1]);

      let res = func(l1, l2);
      console.log(res, expectRes);
      expect(res).to.deep.eq(expectRes);
    });
  }
});
