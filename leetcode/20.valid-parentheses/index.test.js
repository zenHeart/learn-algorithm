const func = require('./index');
const { expect } = require('chai');
describe('longest-common-prefix', function() {
  let testData = {
    empty: ['', true],
    empty1: ['()', true],
    empty2: ['()[]{}', true],
    empty3: ['(]', false],
    empty4: ['([)]', false],
    empty5: ['{[]}', true],
    empty6: ['({[]})', true]
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];
      // @ts-ignore
      let res = func(data[0]);

      expect(res).to.eq(data[1]);
    });
  }
});
