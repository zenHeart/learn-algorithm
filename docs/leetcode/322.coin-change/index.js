
// 记忆化递归解法，防止爆栈
const coinChange = (coins, amount) => {
  if (!Array.isArray(coins) || coins.length === 0 || amount < 0) return -1;
  coins.sort((a, b) => a - b); // 优先用小面额
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};
export default coinChange;
