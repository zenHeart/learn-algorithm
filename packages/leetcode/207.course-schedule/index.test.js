const answer = require('./index');
const testCases = require('./fixture')
const { expect } = require('chai');
describe.only('clone-graph', function () {
  testCases.forEach((testData, index) => {
    it(`${testData.describe || index + '.clone-graph'}`, function () {
      let res = answer.apply(this, testData.input);
      expect(res).to.deep.eq(testData.expect);
    })
  });
});
