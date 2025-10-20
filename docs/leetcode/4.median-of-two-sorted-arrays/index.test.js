import func from './index.js';
import { describe, it, expect } from 'vitest';
describe('Longest Substring Without Repeating Characters', () => {
  let testData = {
    'one empty': {
      input: [[], [1]],
      expect: 1
    },
    'tow array': {
      input: [
        [1, 2],
        [3, 4]
      ],
      expect: 2.5
    }
  };

  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];

      let res = func(data.input[0], data.input[1]);

      expect(res).toBe(data.expect);
    });
  }
});
