/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  let i = 0;
  let carry = 0;
  let resStr = "";
  while (i < a.length || i < b.length) {
    // 两个字符串均有值
    let currentA = i < a.length ? Number(a[a.length - 1 - i]) : 0,
      currentB = i < b.length ? Number(b[b.length - 1 - i]) : 0;
    i++;
    let res = currentA + currentB + carry;
    if (res > 1) {
      carry = 1;
    } else {
      carry = 0;
    }
    resStr = (res % 2) + resStr;
  }
  if (carry) {
    resStr = carry + resStr;
  }
  return resStr;
};
module.exports = addBinary;
