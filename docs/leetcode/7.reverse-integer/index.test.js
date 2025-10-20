import func from './index.js';
import { describe, it, expect } from 'vitest';
describe('reverse integer', () => {
  let testData = {
    'has zero': {
      input: 1200,
      expect: false
    },
    negative: {
      input: -123321,
      expect: false
    },
    negative1: {
      input: -121,
      expect: false
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
