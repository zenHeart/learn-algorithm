import { describe, it, expect } from 'vitest';
import computeArea from './index';

let testData = {
  "示例 1": {
    input: [-3,0,3,4,0,-1,9,2],
    expect: 45
  },
  "示例 2": {
    input: [-2,-2,2,2,-2,-2,2,2],
    expect: 16
  },
};


describe('223. 矩形面积', () => {
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];
      let res = computeArea(...data.input);
      expect(res).toEqual(data.expect);
    });
  }
});
