const func = require('./index');
const { expect } = require('chai');
const {
  createListWithArray
} = require('../../data-structures/02.list/LinkedList.js');

describe('add two number', function () {
  it('addTwoNumbers', function () {
    let testData = [
      {
        input: [
          [2, 4, 3],
          [5, 6, 4]
        ],
        expect: [7, 0, 8]
      },
      {
        input: [
          [2, 4, 3],
          [5, 6, 4, 1, 1, 1, 1, 1]
        ],
        expect: [7, 0, 8, 1, 1, 1, 1, 1]
      },
      {
        input: [[2, 4, 3], [5]],
        expect: [7, 4, 3]
      },
      {
        input: [[1], [9, 9, 9]],
        expect: [0, 0, 0, 1]
      }
    ];
    testData.forEach(ele => {
      let l1 = createListWithArray(ele.input[0]);
      let l2 = createListWithArray(ele.input[1]);
      let expectRes = createListWithArray(ele.expect);

      let res = func(l1, l2);

      expect(res).deep.eq(expectRes);
    });
  });
});
