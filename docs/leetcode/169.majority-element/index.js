/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let elesCount = {};
  for (let val of nums) {
    if (elesCount[val]) {
      elesCount[val]++
    } else {
      elesCount[val] = 1
    }
  }
  let halfCount = nums.length / 2;
  let eles = Object.keys(elesCount);
  for (let val of eles) {
    if (elesCount[val] > halfCount) {
      return val
    }
  }
};

export default majorityElement;