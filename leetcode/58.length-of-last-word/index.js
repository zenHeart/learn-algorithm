/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let lastWordLen = 0,
    back = 0;

  for (let i = 0; i < s.length; i++) {
    let currentChar = s[i];

    if (currentChar === ' ') {
      back = lastWordLen || back;
      lastWordLen = 0;
    } else {
      lastWordLen++;
    }
  }
  return lastWordLen || back;
};
module.exports = lengthOfLastWord;
