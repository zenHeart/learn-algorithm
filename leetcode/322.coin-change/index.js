// 为了避免重复计算采用缓存

var _cache = [];
var key = null;

var coinChange = function(coins, amount) {
  let k = coins.toString();
  if (key !== k) {
    _cache = [];
    key = k;
  }

  // 金额为空则返回的解为空值
  // 保存需要最少硬币数对应的解
  let minCoins = -1;

  //注意若金额小于等于 0 则直接返回
  if (amount < 0) {
    return minCoins;
  }
  if (amount === 0) {
    return 0;
  }

  if (_cache[amount]) {
    // 有缓存结果直接返回
    return _cache[amount];
  } else {
    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i];
      let newAmount = amount - coin;
      let newMinCoins = coinChange(coins, newAmount);
      // 总金额和结果相同才说明有解
      if (newMinCoins >= 0 || (newMinCoins === -1 && coin === amount)) {
        // 注意由于存在解此时 newMinCoins 默认值需改为 0
        if (newMinCoins === -1) {
          newMinCoins = 0;
        }

        if (minCoins === -1) {
          minCoins = newMinCoins + 1;
        }
        if (minCoins > newMinCoins + 1) {
          minCoins = newMinCoins + 1;
        }
      }
    }
    // 缓存结果,无论成功还是失败
    _cache[amount] = minCoins;
  }

  return minCoins;
};

module.exports = coinChange;

console.log(coinChange([1, 2, 3], 383));
