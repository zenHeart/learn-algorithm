import func from './index.js';
import { describe, it, expect } from 'vitest';
describe('longest-common-prefix', () => {
  let testData = [
    [[], ''],
    [['abc', 'fgh'], ''],
    [['abc', ''], ''],
    [['abc'], 'abc'],
    [['abc', 'abcd'], 'abc']
  ];
  it('test', () => {
    for (let data of testData) {
      let res = func(data[0]);

      expect(res).toBe(data[1]);
    }
  });
});
