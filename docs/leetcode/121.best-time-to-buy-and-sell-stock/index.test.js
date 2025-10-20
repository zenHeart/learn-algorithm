import func from './index.js';
import { describe, it, expect } from 'vitest';

const SUITE_NAME = 'maxProfit' || func.name;
const TEST_DATA = {
  0: [
    [[]],
    0
  ],
  1: [
    [[1]],
    0
  ],
  2: [
    [[1, 3]],
    2
  ],
  3: [
    [[5, 3]],
    0
  ],
  4: [
    [[7,1,5,3,6,4]],
    5,
  ],
  large:[
    [ Array.from({length: 1e4}).map((e,i) => i) ],
    1e4-1
  ],
};

describe.skip(SUITE_NAME, function() {
  for (let unitTestName in TEST_DATA) {
    it(unitTestName, () => {
      let data = TEST_DATA[unitTestName];

      let res = func.apply(this, data[0]);
      expect(res).toEqual(data[1]);
    });
  }
});
