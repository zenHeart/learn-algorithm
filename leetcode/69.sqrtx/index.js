/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  let res = 0;
  while (res * res < x) {
    res += 1;
  }
  if (res * res > x) {
    return res - 1;
  } else {
    return res;
  }
};
module.exports = mySqrt;
