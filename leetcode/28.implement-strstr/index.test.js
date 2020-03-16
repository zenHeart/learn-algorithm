const func = require('./index');
const { expect } = require('chai');

describe('实现 strStr()', function() {
  let testData = {
    empty: [['', ''], 0],
    value1: [['hello', 'll'], 2],
    value2: [['aaaaa', 'bba'], -1]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0][0], data[0][1]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
