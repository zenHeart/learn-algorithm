function duplicateCombination(nums) {
  const result = [];

  // 数组排序方便后续剪枝
  nums.sort((a, b) => a - b);

  const used = new Array(nums.length).fill(false);

  function backtracking(path = []) {
    // 1. 长度一样存储结果
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 2. 剪枝：如果当前数字已经被使用，跳过
      if (used[i]) {
        continue;
      }

      // 3. 剪枝：如果当前数字和前一个数字相同且前一个数字未被使用，跳过
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }

      // 4. 做出选择
      used[i] = true;
      path.push(nums[i]);
      backtracking(path);
      // 5. 撤销选择
      path.pop();
      used[i] = false;
    }
  }
  backtracking();
  return result;

}
console.log(duplicateCombination([1, 2, 1])); // 输出所有可能的组合