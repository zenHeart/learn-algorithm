const func = require('./index');
const { expect } = require('chai');

describe('plus one', function() {
  let testData = {
    empty: [[], [1]],
    value1: [
      [9, 9, 9],
      [1, 0, 0, 0]
    ],
    value2: [
      [9, 1, 9],
      [9, 2, 0]
    ]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
