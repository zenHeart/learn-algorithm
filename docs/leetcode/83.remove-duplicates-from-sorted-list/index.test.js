const func = require('./index');
const { expect } = require('chai');
const {
  createListWithArray
} = require('../../data-structures/02.list/LinkedList.js');

describe('remove-duplicates-from-sorted-list', function () {
  let testData = {
    empty: [[], []],
    value1: [
      [1, 1, 2],
      [1, 2]
    ],
    value2: [[1, 1, 1], [1]],
    value3: [
      [1, 1, 2, 3, 3],
      [1, 2, 3]
    ]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function () {
      let data = testData[unitTestName];
      let l = createListWithArray(data[0]);
      let expectRes = createListWithArray(data[1]);

      let res = func(l);
      expect(res).to.deep.eq(expectRes);
    });
  }
});
