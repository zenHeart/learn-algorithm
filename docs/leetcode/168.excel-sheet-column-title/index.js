/**
 * @param {number} n
 * @return {string}
 */
var convertToTitle = function (n) {
  let backN = n;
  let res = '';
  while (backN / 26 > 1) {
    let mod = backN % 26;
    backN = Math.floor(backN / 26);
    res = String.fromCharCode(64 + mod) + res;
  }
  if (backN) {
    res = String.fromCharCode(64 + backN) + res;
  }
  return res;
};

export default convertToTitle;
