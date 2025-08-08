function combination(nums, k) {
  let result = [];

  function backtracking(path, start = 0) {
    // 1. 成功结果
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    // 2. 选择列表
    for (let i = start; i < nums.length; i++) {
      let num = nums[i];

      // 3. 剪枝排除重复的逻辑
      if (path.includes(num)) {
        continue; // 如果当前数字已经在路径中，跳过
      }

      // 4. 作出选择
      // path.push(num);
      backtracking([...path, num], i + 1); // 注意这里的i + 1，避免重复选择同一元素
      // 5. 撤销选择, 进行下一个分支逻辑
      // path.pop();
    }
  }


  // 6. 启动回溯
  backtracking([], 0);
  return result;
}


console.log(combination([1, 2], 2)); // 输出所有长度为2的组合