const func = require('./index');
const { expect } = require('chai');

describe('climbStairs', function() {
  let testData = {
    value1: [1, 1],
    value2: [2, 2],
    value3: [3, 3],
    value4: [45, 1836311903]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).to.eq(data[1]);
    });
  }
});
