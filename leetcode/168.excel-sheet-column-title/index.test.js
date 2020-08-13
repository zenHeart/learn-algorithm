const func = require('./index');
const { expect } = require('chai');

describe.skip('Excel 表列名称', function() {
  let testData = {
    value1: [1, 'A'],
    value2: [2, 'B'],
    value3: [26, 'Z'],
    value4: [27, 'AA'],
    value5: [52, 'AZ'],
    value6: [701, 'ZY']
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data[0]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
