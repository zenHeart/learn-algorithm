import answer from './index.js';
import testCases from './fixture.js';
import { describe, it, expect } from 'vitest';

describe('course-schedule', () => {
  testCases.forEach((testData, index) => {
    it(`${testData.describe || index + '.course-schedule'}`, () => {
      let res = answer.apply(null, testData.input);
      expect(res).toBe(testData.expect);
    });
  });
});
