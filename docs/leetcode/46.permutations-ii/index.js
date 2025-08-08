/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const result = [];
  const used = new Array(nums.length).fill(false); // 用于标记元素是否已使用

  nums.sort((a, b) => a - b); // 方便后续剪枝

  function backtracking(path = []) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      const cur = nums[i];
      // 跳过已经使用的元素
      if (used[i]) continue; // 避免重复使用同一元素

      // 跳过同层重复元素
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue; // 避免同层重复
      }

      used[i] = true;
      backtracking([...path, cur]); // 注意 i + 1，避免重复使用同
      used[i] = false; // 回溯时重置标记，允许下次使用
    }
  }

  backtracking();
  return result;
};

console.log(permuteUnique([1, 1, 2])); // 示例输入