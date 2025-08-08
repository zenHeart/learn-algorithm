/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {

  const result = [];

  function backtrack(path = []) {
    const sum = path.length ? path.reduce((a, b) => a + b) : 0;


    // 最多只推入 150 个答案
    if (sum === target && result.length < 150) {
      const orderPath = [...path].sort((a, b) => a - b);
      if (result.some(item => item.toString() === orderPath.toString())) return;
      result.push(orderPath);
      return;
    }

    // 一个值可以反复选择
    for (let i = 0; i < candidates.length; i++) {
      const cur = candidates[i];

      // 开始剪枝
      if (cur + sum > target || result.length >= 150) continue;
      path.push(cur);
      backtrack(path);
      path.pop();
    }
  }

  backtrack();
  return result;
};





// 示例输入
const candidates = [2, 3, 6, 7];
const target = 7;

/**
 * 优化版 combinationSumV2
 * 主要优化点：
 * 1. 回溯时传递 startIndex，避免重复组合，无需排序和去重判断
 * 2. sum 作为参数累加传递，避免每次 reduce
 * 3. candidates 先排序，剪枝时遇到 cur+sum>target 可直接 break
 * 4. 结果数量限制逻辑更清晰
 */
var combinationSumV2 = function (candidates, target) {
  candidates.sort((a, b) => a - b); // 排序便于剪枝
  const result = [];

  function backtrack(path, sum, startIndex) {
    if (sum === target) {
      if (result.length < 150) result.push([...path]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      const cur = candidates[i];
      if (cur + sum > target || result.length >= 150) break; // 剪枝
      path.push(cur);
      backtrack(path, sum + cur, i); // 可重复选，i 不变
      path.pop();
    }
  }

  backtrack([], 0, 0);
  return result;
};

// v2 示例
console.log(combinationSumV2(candidates, target)); // 输出 [[2,2,3],[7]]

