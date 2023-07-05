const { insertionSort: func, bigIntAdd } = require("./index");
const { expect } = require("chai");

describe("insertion sort", function () {
  let testData = {
    empty: [
      [],
      [],
    ],
    oneVal: [
      [[1]],
      [1],
    ],
    order: [
      [[3, 2, 1]],
      [1, 2, 3],
    ],
    hasSameValue: [
      [[3, 2, 1, 1]],
      [1, 1, 2, 3],
    ],
    multiVal: [
      [[5, 6, 7, 1, 2, 3, 4]],
      [1, 2, 3, 4, 5, 6, 7],
    ],
    inverseMultiVal: [
      [[5, 6, 7, 1, 2, 3, 4], false],
      [7, 6, 5, 4, 3, 2, 1],
    ],
    inverseEmpty: [
      [[], false],
      [],
    ],
    inverseOneVal: [
      [[1], false],
      [1],
    ],
    inversemultiSame: [
      [[1, 2, 3, 2, 1], false],
      [3, 2, 2, 1, 1],
    ],
  };
  for (let unitTestName in testData) {
    it(unitTestName, function () {
      let data = testData[unitTestName];

      const res = func.call(undefined, ...data[0]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});

describe("big int add", function () {
  let testData = {
    empty: [
      [[], []],
      [],
    ],
    oneVal: [
      [[1], [1]],
      [2],
    ],
    oneValOverflow: [
      [[9], [9]],
      [8, 1],
    ],
    differentLength: [
      [[3, 2], [1]],
      [4, 2],
    ],
    long: [
      [[9, 9, 2, 1, 9], [1, 1, 1, 1, 1, 9, 9]],
      [0, 1, 4, 2, 0, 0, 0, 1],
    ],
    long1: [
      [[9], [9, 9, 9]],
      [8, 0, 0, 1],
    ],
  };
  for (let unitTestName in testData) {
    it(unitTestName, function () {
      let data = testData[unitTestName];

      const res = bigIntAdd.call(undefined, ...data[0]);
      expect(res).to.deep.eq(data[1]);
    });
  }
});
