const func = require('./index');
const { expect } = require('chai');

describe('实现 strStr()', function() {
  let testData = {
    empty: [[[1, 3, 5, 6], 5], 2],
    value1: [[[1, 3, 5, 6], 2], 1],
    value2: [[[1, 3, 5, 6], 7], 4],
    value3: [[[1, 3, 5, 6], 0], 0]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0][0], data[0][1]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
