const func = require('./index');
const { expect } = require('chai');

describe('longest-common-prefix', function() {
  let testData = {
    empty: [[], 0],
    value1: [[0, 0, 1, 1, 2, 2], 3]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
