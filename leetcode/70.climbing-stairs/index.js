/**
 * @param {number} n
 * @return {number}
 */
let cache = {};
var climbStairs = function step(n) {
  if (n <= 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  } else {
    if (!cache[n]) {
      let res = step(n - 1) + step(n - 2);
      cache[n] = res;
    }
    return cache[n];
  }
};
module.exports = climbStairs;
