import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('Longest Substring Without Repeating Characters', () => {
  let testData = {
    'same charter': {
      input: 'bbbbb',
      expect: 1
    },
    'begin is longest': {
      input: 'abcabcbb',
      expect: 3
    },
    normal: {
      input: 'pwwkew',
      expect: 3
    },
    'empty string': {
      input: ' ',
      expect: 1
    },
    'all charter different': {
      input: 'abcdefghijklmnopqrstuvwxyz',
      expect: 26
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
