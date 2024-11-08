const func = require('./index');
const { expect } = require('chai');

describe('实现 strStr()', function() {
  let testData = {
    value1: [[], -2147483648],
    value2: [[-5], -5],
    value3: [[-2, 1, -3, 4, -1, 2, 1, -5, 4], 6]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
