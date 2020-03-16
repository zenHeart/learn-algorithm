const func = require('./index');
const { expect } = require('chai');

describe('1 two sum', function() {
  it('two sum', function() {
    let testData = [
      {
        input: [[1, 2, 3], 3],
        expect: [0, 1]
      },
      {
        input: [[0, 4, 3, 0], 0],
        expect: [0, 3]
      },
      {
        input: [[-3, 4, 3, 90], 0],
        expect: [0, 2]
      }
    ];
    testData.forEach(ele => {
      expect(func(ele.input[0], ele.input[1])).deep.eq(ele.expect);
    });
  });
});
