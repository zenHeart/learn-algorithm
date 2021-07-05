/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if (x < 0) {
    return false;
  }
  let arr = x.toString(10).split('');
  let res = Number(arr.reverse().join(''));
  if (res === x) {
    return true;
  } else {
    return false;
  }
};

module.exports = isPalindrome;

console.log(isPalindrome(-123321));
