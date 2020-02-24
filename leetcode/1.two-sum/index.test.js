const { calcAllResult, twoSum } = require('./index');
const { expect } = require('chai');

describe('1 two sum', function() {
  it('two sum', function() {
    let testData = [
      {
        input: [[1, 2, 3], 3],
        expect: [0, 1]
      }
    ];
    testData.forEach(ele => {
      expect(twoSum(ele.input[0], ele.input[1])).deep.eq(ele.expect);
    });
  });
  it('calcAllResult', function() {
    let testData = [
      {
        input: [1, 2, 3],
        expect: {
          3: [0, 1],
          4: [0, 2],
          5: [1, 2]
        }
      }
    ];

    testData.forEach(ele => {
      expect(calcAllResult(ele.input)).deep.eq(ele.expect);
    });
  });
});
