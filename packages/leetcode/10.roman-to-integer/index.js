/**
 * @param {string} s
 * @return {number}
 */
const ROMA_BASE = {
  I: 1,
  IV: 4,
  V: 5,
  IX: 9,
  X: 10,
  XL: 40,
  L: 50,
  XC: 90,
  C: 100,
  CD: 400,
  D: 500,
  CM: 900,
  M: 1000
};
var romanToInt = function(s) {
  let res = [];
  for (let i = 0; i < s.length; i++) {
    let current = s[i];
    // 在 js 合法,即使溢出会返回空
    let next = s[i + 1];
    if (next && ROMA_BASE[current + next]) {
      res.push(current + next);
      i++;
    } else {
      res.push(current);
    }
  }
  return res.reduce((sum, ele) => (sum += ROMA_BASE[ele]), 0);
};
module.exports = romanToInt;
console.log(romanToInt('IXXI'));
