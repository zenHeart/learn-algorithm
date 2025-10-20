/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
export default twoSum;
function twoSum(nums, target) {
  let res = {};
  for (let i = 0; i < nums.length; i++) {
    let current = nums[i];
    let left = target - current;
    if (left in res) {
      return [res[left], i];
    } else {
      res[current] = i;
    }
  }
}
