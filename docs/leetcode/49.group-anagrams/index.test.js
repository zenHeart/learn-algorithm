import { describe, it, expect } from 'vitest';
import groupAnagrams from './index';

let testData = {
  "示例 1": {
    input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
    expect: [
      [
        "eat",
        "tea",
        "ate"
      ],
      [
        "tan",
        "nat"
      ],
      [
        "bat"
      ]
    ]
  },
  "示例 2": {
    input: [[""]],
    expect: [[""]]
  },
  "示例 3": {
    input: [["a"]],
    expect: [["a"]]
  },
  "empty two": {
    input: [["", ""]],
    expect: [["", ""]]
  }
};


describe('49. 字母异位词分组', () => {
  for (let unitTestName in testData) {
    it(unitTestName, () => {
      let data = testData[unitTestName];
      let res = groupAnagrams(...data.input);
      expect(res).toEqual(data.expect);
    });
  }
});
