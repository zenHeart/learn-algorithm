function permute(nums) {
  const result = [];


  function backtracking(path = []) {
    // 1. 成功结果
    if (path.length === nums.length) {
      return result.push([...path]);
    }

    // 2. 选择列表
    for (let i = 0; i < nums.length; i++) {
      let num = nums[i];

      // 3. 剪枝排除重复的逻辑
      if (path.includes(num)) {
        continue; // 如果当前数字已经在路径中，跳过
      }

      // 4. 作出选择
      // path.push(num);
      backtracking([...path, num]); // 注意这里的i + 1，避免重复选择同一元素
      // 5. 撤销选择, 进行下一个分支逻辑
      // path.pop();
    }
  }

  // 6. 启动回溯
  backtracking();
  return result;
}

console.log(permute([1, 2])); 