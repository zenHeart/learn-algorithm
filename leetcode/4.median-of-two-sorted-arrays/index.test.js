const func = require('./index');
const { expect } = require('chai');
describe('Longest Substring Without Repeating Characters', function() {
  let testData = {
    'one empty': {
      input: [[], [1]],
      expect: 1
    },
    'tow array': {
      input: [
        [1, 2],
        [3, 4]
      ],
      expect: 2.5
    }
  };

  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = func(data.input[0], data.input[1]);

      expect(res).to.eq(data.expect);
    });
  }
});
