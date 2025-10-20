/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let longest = [];
  for (let i = 0; i < s.length - longest.length; i++) {
    let currentRes = [];
    for (let j = i; j < s.length; j++) {
      let currentChar = s[j];
      currentRes.push(currentChar);
      if (
        currentRes.length > longest.length &&
        currentRes.join("") ===
        currentRes
          .slice()
          .reverse()
          .join("")
      ) {
        longest = currentRes.slice();
      }
    }
  }
  return longest.join("");
};

export default longestPalindrome;
