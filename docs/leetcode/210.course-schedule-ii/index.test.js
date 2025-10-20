import answer from './index.js';
import testCases from './fixture.js';
import { describe, it, expect } from 'vitest';

describe('course-schedule-ii', () => {
  testCases.forEach((testData, index) => {
    it(`${testData.describe || index + '.course-schedule-ii'}`, () => {
      let res = answer.apply(null, testData.input);
      expect(res).toEqual(testData.expect);
    });
  });
});
