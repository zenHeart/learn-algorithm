const func = require('./index');
const { expect } = require('chai');
describe('palindrome number', function() {
  let testData = {
    "one value":  {
      input: 0,
      expect: true
    },
    'positive palindrome number': {
      input: 121,
      expect: true
    },
    'no positive palindrome number': {
      input: 1211,
      expect: false
    },
    'negative palindrome number': {
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
