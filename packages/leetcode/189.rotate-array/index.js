/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
  let newArr = [];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let newIndex = (i + k) % len;
    newArr[newIndex] = nums[i];
  }
  // @ts-ignore
  for (let i = 0; i < len; i++) {
    nums[i] = newArr[i];
  }
};
module.exports = rotate;
