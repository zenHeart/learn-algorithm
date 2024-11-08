/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
  // 数组为空返回 1
  if (!digits.length) {
    return [1];
  }
  let carry = 0;
  let resArr = [];
  for (let i = digits.length - 1; i >= 0; i--) {
    let currentVal = digits[i];

    let res =
      i === digits.length - 1 ? currentVal + 1 + carry : currentVal + carry;
    if (res > 9) {
      carry = 1;
    } else {
      carry = 0;
    }
    resArr.unshift(res % 10);
  }
  if (carry) {
    resArr.unshift(carry);
  }
  return resArr;
};
module.exports = plusOne;
