
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  candidates.sort((a, b) => a - b); // 排序便于剪枝
  const result = [];

  function backtrack(path, sum, startIndex) {
    if (sum === target) {
      if (result.some(item => item.toString() === path.toString())) return; // 去重
      result.push([...path]);
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      const cur = candidates[i];
      // 开始剪枝
      if (sum + cur > target) continue;
      backtrack([...path, cur], sum + cur, i + 1); // 注意 i + 1，避免重复使用同一元素
    }
  }
  backtrack([], 0, 0)
  return result; // 初始调用
};

/**
 * 优化版 combinationSum2V2
 * 主要优化点：
 * 1. 利用排序和同层去重，避免递归中 result.some 检查，提升效率
 * 2. path 直接复用，减少内存消耗
 * 3. 剪枝时遇到 sum+cur>target 可直接 break
 */
var combinationSum2V2 = function (candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];

  function backtrack(path, sum, startIndex) {
    if (sum === target) {
      result.push([...path]);
      return;
    }
    for (let i = startIndex; i < candidates.length; i++) {
      // 跳过同层重复元素
      if (i > startIndex && candidates[i] === candidates[i - 1]) continue;
      const cur = candidates[i];
      if (sum + cur > target) break; // 剪枝
      path.push(cur);
      backtrack(path, sum + cur, i + 1);
      path.pop();
    }
  }

  backtrack([], 0, 0);
  return result;
};

// v2 示例
console.log(combinationSum2V2(candidates, target)); // 输出所有组合




// 示例输入
const candidates = [7, 1, 1, 2, 3, 6];
const target = 7;
console.log(combinationSum2(candidates, target)); // 输出所有组合
