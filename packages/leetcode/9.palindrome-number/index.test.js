const func = require('./index');
const { expect } = require('chai');
describe('reverse integer', function() {
  let testData = {
    'has zero': {
      input: 1200,
      expect: 21
    },
    negative: {
      input: -1230,
      expect: -321
    },
    overflow: {
      input: 2 ** 32,
      expect: 0
    },
    ' negative overflow': {
      input: -(2 ** 32),
      expect: 0
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
