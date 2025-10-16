/**
 * 计算使用 nums 中的数字（每个数字可用无限次），和为 target 的组合数
 * @param {*} nums 数组，可选的数字
 * @param {*} target 目标和
 * @returns number 返回解的个数
 */
function sum(nums, target) {
   // dp[i] 表示和为 i 的组合数
   const dp = new Array(target + 1).fill(0);
   dp[0] = 1; // 和为 0 只有一种组合：什么都不选

   // 遍历每个数字
   for (let i = 0; i < nums.length; i++) {
      // 对每个可能的和，从当前数字开始累加到 target
      for (let j = nums[i]; j <= target; j++) {
         // 状态转移：把当前数字加到之前的组合上
         dp[j] += dp[j - nums[i]];
      }
   }
   // 返回和为 target 的组合数
   return dp[target];
}

