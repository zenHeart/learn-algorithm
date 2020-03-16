/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
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
module.exports = lengthOfLongestSubstring;

console.log(lengthOfLongestSubstring(' '));
