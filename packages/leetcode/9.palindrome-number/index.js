/**
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {
  let str = x.toString();
  let middle = Math.floor(str.length/2);
  for(i = 0; i< middle; i++) {
    if(str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true
};
module.exports = isPalindrome;
