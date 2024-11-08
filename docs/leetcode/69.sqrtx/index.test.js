const func = require('./index');
const { expect } = require('chai');

describe('sqrtx', function() {
  let testData = {
    empty: [0, 0],
    value1: [1, 1],
    value2: [2, 1],
    value3: [4, 2],
    value4: [8, 2],
    value5: [247776352, 15740],
    value6: [2147395599, 46339],
    value7: [1041080284, 32265]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).to.eq(data[1]);
    });
  }
});
