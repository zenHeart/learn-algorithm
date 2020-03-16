/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let numbers = x.toString(10).split('');
  if (x < 0) {
    numbers = numbers.slice(1);
  }
  let res = numbers.reduce(
    (sum, ele, index) => (sum += Number(ele) * 10 ** index),
    0
  );
  if (x < 0) {
    res = -res;
  }
  if (res < -(2 ** 31) || res > 2 ** 31 - 1) {
    res = 0;
  }
  return res;
};
module.exports = reverse;
