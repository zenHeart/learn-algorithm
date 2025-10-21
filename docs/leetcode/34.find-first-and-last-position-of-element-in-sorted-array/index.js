/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let res = [-1, -1]
  let min = 0, max = nums.length - 1;
  while (min <= max) {
    let midIndex = Math.floor((min + max) / 2);
    let midValue = nums[midIndex];
    if (midValue === target) {
      res[]

    }
  }

  return res;

};
export default searchRange;
