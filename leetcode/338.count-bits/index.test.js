const func = require('./index');
const { expect } = require('chai');

const SUITE_NAME = 'maxProfit' || func.name;
const TEST_DATA = {
  0: [
    [1],
    [0,1]
  ],
  1: [
    [2],
    [0,1,1]
  ],
  5: [
    [5],
    [[0,1,1,2,1,2]]
  ],
};

describe.skip(SUITE_NAME, function() {
  for (let unitTestName in TEST_DATA) {
    it(unitTestName, function() {
      let data = TEST_DATA[unitTestName];

      let res = func.apply(this, data[0]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
