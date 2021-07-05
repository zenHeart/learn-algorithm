const func = require('./index');
const { expect } = require('chai');

describe('remove element', function() {
  let testData = {
    empty: [[[], 0], 0],
    value1: [[[0, 0, 1, 1, 2, 2], 0], 4]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0][0], data[0][1]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
