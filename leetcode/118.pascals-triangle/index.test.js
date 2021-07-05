const func = require('./index');
const { expect } = require('chai');

const SUITE_NAME = 'pascals-triangle' || func.name;
const TEST_DATA = {
  one: [
    [1],
    [
      [1]
    ]
    ,
  ],
  five: [
    [5],
    [
      [1],
      [1,1],
      [1,2,1],
      [1,3,3,1],
      [1,4,6,4,1]
    ]
  ]
};

describe(SUITE_NAME, function() {
  for (let unitTestName in TEST_DATA) {
    it(unitTestName, function() {
      let data = TEST_DATA[unitTestName];

      let res = func.apply(this, data[0]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
