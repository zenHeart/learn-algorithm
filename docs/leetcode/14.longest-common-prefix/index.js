/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  // 数组为空直接返回
  if (strs.length === 0) {
    return '';
  }
  // 只有一个元素直接返回
  if (strs.length === 1) {
    return strs[0];
  }

  let res = '';
  let firstStr = strs[0];

  for (let i = 0; i < firstStr.length; i++) {
    let currentChar = firstStr[i];
    for (let j = 1; j < strs.length; j++) {
      let newStr = strs[j];
      if (newStr[i] === currentChar) {
        continue;
      } else {
        return res;
      }
    }
    res += currentChar;
  }
  return res;
};

export default longestCommonPrefix;
