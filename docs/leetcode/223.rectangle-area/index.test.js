import { describe, it, expect } from 'vitest';
import computeArea from './index';

let testData = {
  "两个矩形部分重叠": {
    input: [-3, 0, 3, 4, 0, -1, 9, 2],
    expect: 45,
  },
  "两个矩形完全重合": {
    input: [-2, -2, 2, 2, -2, -2, 2, 2],
    expect: 16,
  },
  "两个矩形不重叠": {
    input: [0, 0, 1, 1, 2, 2, 3, 3],
    expect: 2,
  },
  "一个矩形包含另一个矩形": {
    input: [0, 0, 4, 4, 1, 1, 2, 2],
    expect: 16,
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
