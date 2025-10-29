/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  // 初始设置字符串长度为 0
  let longest = 0;

  // 起始位置
  for (let i = 0; i < s.length; i++) {
    // 重置初始字符串
    let str = '';
    // 结束位置
    for (let j = i; j < s.length; j++) {
      const c = s[j];
      // 包含则退出
      if (str.includes(c)) {
        break
      } else {
        // 不包含则添加字符
        str += c;
        // 如果长度超过了目前最长的值则更新最长值
        if (str.length > longest) {
          longest = str.length
        }
      }
    }
  }
  // 遍历完成后返回最长的结果
  return longest;
};

var lengthOfLongestSubstringV1 = function (s) {
  let longest = 0;
  for (let i = 0; i < s.length - longest; i++) {
    let subString = [];
    for (let j = i; j < s.length; j++) {
      let currentChar = s[j];
      if (!subString.includes(currentChar)) {
        subString.push(currentChar);
        if (subString.length > longest) {
          longest = subString.length;
        }
      } else {
        break;
      }
    }
  }
  return longest;
};
export default lengthOfLongestSubstring;
