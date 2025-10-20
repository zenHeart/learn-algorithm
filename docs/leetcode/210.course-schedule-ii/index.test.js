import func from './index.js';
import testCases from './fixture.js';
import { describe, it, expect } from 'vitest';

describe('course-schedule-ii', () => {
  testCases.forEach((testData, index) => {
    it(`${testData.describe || index + '.course-schedule-ii'}`, () => {
      let res = func(...testData.input);
      expect(res).toEqual(testData.expect);
    });
  });
});
