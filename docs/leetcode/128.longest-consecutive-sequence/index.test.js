import { describe, it, expect } from 'vitest';
import longestConsecutive from './index';

let testData = {
  "示例 1": {
    input: [[100,4,200,1,3,2]],
    expect: 4
  },
  "示例 2": {
    input: [[0,3,7,2,5,8,4,6,0,1]],
    expect: 9
  },
  "示例 3": {
    input: [[1,0,1,2]],
    expect: 3
  },
};


describe('128. 最长连续序列', () => {
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];
      let res = longestConsecutive(...data.input);
      expect(res).toEqual(data.expect);
    });
  }
});
