/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];
  function backtacking(path = []) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      const cur = nums[i];
      if (path.includes(cur)) continue; // 避免重复使用同一元素
      backtacking([...path, cur]); // 注意 i + 1，避免重复使用同一元素
    }
  }
  backtacking();
  return result;
};

console.log(permute([1, 2, 3]));