
import func from './index.js';
import testCases from './fixture.js';
import { describe, it, expect } from 'vitest';

describe('clone-graph', () => {
  testCases.forEach((testData, index) => {
    it(`${testData.describe || index + '.clone-graph'}`, () => {
      let res = func(...testData.input);
      expect(res).toEqual(testData.expect);
    });
  });
});
