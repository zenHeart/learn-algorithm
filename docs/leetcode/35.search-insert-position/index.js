/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let i;
  for (i = 0; i < nums.length; i++) {
    let current = nums[i];
    if (current === target) {
      return i;
    } else {
      if (current > target) {
        return i;
      }
    }
  }
  return i;
};

export default searchInsert;
