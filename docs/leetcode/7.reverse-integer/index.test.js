const func = require('./index');
const { expect } = require('chai');
describe('reverse integer', function() {
  let testData = {
    'has zero': {
      input: 1200,
      expect: false
    },
    negative: {
      input: -123321,
      expect: false
    },
    negative1: {
      input: -121,
      expect: false
    }
  };

  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data.input);

      expect(res).to.eq(data.expect);
    });
  }
});
