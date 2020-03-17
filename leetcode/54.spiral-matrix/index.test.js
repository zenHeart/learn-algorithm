const func = require('./index');
const { expect } = require('chai');

describe.skip('实现 strStr()', function() {
  let testData = {
    value1: [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      [1, 2, 3, 6, 9, 8, 7, 4, 5]
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
