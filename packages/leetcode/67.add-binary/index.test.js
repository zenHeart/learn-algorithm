const func = require('./index');
const { expect } = require('chai');

describe('add binary', function() {
  let testData = {
    empty: [['', ''], ''],
    value1: [['11', '1'], '100'],
    value2: [['1010', '1011'], '10101'],
    value3: [['11', ''], '11']
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0][0], data[0][1]);
      expect(res).to.eq(data[1]);
    });
  }
});
