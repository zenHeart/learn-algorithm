/**
 * @param {number[]} nums
 * @return {number}
 */
let MIN = -2147483648;
var maxSubArray = function(nums) {
  let resMax = MIN;
  for (let i = 0; i < nums.length; i++) {
    let currentMax = MIN;
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum > currentMax) {
        currentMax = sum;
      }
    }
    if (currentMax > resMax) {
      resMax = currentMax;
    }
  }
  return resMax;
};
module.exports = maxSubArray;

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
