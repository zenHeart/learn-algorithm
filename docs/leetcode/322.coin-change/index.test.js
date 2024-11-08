let { expect } = require('chai');
let coinChange = require('./index');

let testData = {
  输入非法: {
    input: [[1], -1],
    expect: -1
  },
  结果为空: {
    input: [[1], 0],
    expect: 0
  },
  输入合法结果不存在: {
    input: [[2, 3, 4], 1],
    expect: -1
  },
  单一面额结果存在: {
    input: [[1], 100],
    expect: 100
  },
  多种面额结果存在: {
    input: [[1, 2], 100],
    expect: 50
  },
  复杂面额结果存在: {
    input: [[1, 5, 10, 20, 50, 100], 6970],
    expect: 71
  }
};

describe('硬币交换测试用例', function() {
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];
      let res = coinChange(data.input[0], data.input[1]);
      expect(res).to.eq(data.expect);
    });
  }
});
