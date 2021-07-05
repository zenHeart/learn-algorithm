const func = require('./index');
const { expect } = require('chai');
describe('longest-common-prefix', function() {
  let testData = [
    [[], ''],
    [['abc', 'fgh'], ''],
    [['abc', ''], ''],
    [['abc'], 'abc'],
    [['abc', 'abcd'], 'abc']
  ];
  it('test', function() {
    for (let data of testData) {
      // @ts-ignore
      let res = func(data[0]);

      expect(res).to.eq(data[1]);
    }
  });
});
