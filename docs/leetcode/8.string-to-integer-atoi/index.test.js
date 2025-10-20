import func from './index.js';
import { describe, it, expect } from 'vitest';
describe('string to atoi', () => {
  let testData = {
    null1: {
      input: '',
      expect: 0
    },
    null2: {
      input: '     ',
      expect: 0
    },
    null3: {
      input:'"words and 987"',
      expect: 0
    },
    positive: {
      input:'1212121',
      expect: 1212121
    },
    negative: {
      input:'-1212121',
      expect: -1212121
    },
    overflowPositive: {
      input: '99999999999999999999999999999999',
      expect: (2**31) - 1
    },
    overflowNegative: {
      input: '-999999999999999999999999999999999',
      expect: -(2**31)
    },
    error1: {
      input: "-91283472332",
      expect: -2147483648
    }
  };

  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data.input);

      expect(res).toBe(data.expect);
    });
  }
});
