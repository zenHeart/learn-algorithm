/**
 * @param {number} n
 * @return {string}
 */

var countAndSay = function(n) {
  if (n === 1) {
    return '1';
  } else {
    let res = countAndSay(n - 1);
    let count = 0;
    let newRes = '';
    let before = null;
    for (let i = 0; i < res.length; i++) {
      let current = res[i];
      if (before === null) {
        before = current;
      }
      if (before === current) {
        count++;
      } else {
        newRes += `${count}${before}`;
        count = 1;
        before = current;
      }
    }
    if (count) {
      newRes += `${count}${before}`;
    }
    return newRes;
  }
};

module.exports = countAndSay;
