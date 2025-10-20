import func from './index.js';
import { describe, it, expect } from 'vitest';

describe('valid-parentheses', () => {
  let testData = {
    empty: ['', true],
    empty1: ['()', true],
    empty2: ['()[]{}', true],
    empty3: ['(]', false],
    empty4: ['([)]', false],
    empty5: ['{[]}', true],
    empty6: ['({[]})', true]
  };
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];
      let res = func(data[0]);
      expect(res).toBe(data[1]);
    });
  }
});
