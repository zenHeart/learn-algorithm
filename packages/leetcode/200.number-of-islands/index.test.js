let { expect } = require('chai');
let func = require('./index');

let testData = {
  空: [[[0]],0],
  合法: [ [
      ['1','1','1','1','0'],
      ['1','1','0','1','0'],
      ['1','1','0','0','0'],
      ['0','0','0','0','0'],
    ], 1],
  合法1: [[
      ['1','1','0','0','0'],
      ['1','1','0','0','0'],
      ['0','0','1','0','0'],
      ['0','0','0','1','1'],
    ],3],
  单个孤岛: [[
      ['1','0','0','0'],
      ['0','1','0','1','0'],
      ['0','0','1','0','1'],
      ['0','0','0','1'],
    ],6]
};

describe('输入岛屿测试', function() {
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];
      let res = func(data[0]);
      expect(res).to.eq(data[1]);
    });
  }
});
