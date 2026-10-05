import { describe, it, expect } from 'vitest';
import trap from './index';

let testData = {
  "示例 1": {
    input: [[0,1,0,2,1,0,1,3,2,1,2,1]],
    expect: 6
  },
  "示例 2": {
    input: [[4,2,0,3,2,5]],
    expect: 9
  },
};


describe('42. 接雨水', () => {
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];
      let res = trap(...data.input);
      expect(res).toEqual(data.expect);
    });
  }
});
