/**
 * 接雨水问题三种解法
 * @param {number[]} height - 每个位置的高度数组
 * @return {number}
 */

// 暴力破解：枚举每个位置，分别向左和向右遍历，找最大高度，计算当前位置能接的水量
function trapV0(height) {
  let ans = 0;
  // 从第1个到倒数第2个位置
  for (let i = 1; i < height.length - 1; i++) {
    let lMax = 0, rMax = 0;
    // 向左遍历，找左侧最大高度
    for (let j = i; j >= 0; j--) lMax = Math.max(lMax, height[j]);
    // 向右遍历，找右侧最大高度
    for (let j = i; j < height.length; j++) rMax = Math.max(rMax, height[j]);
    // 当前能接的水量 = min(左最大, 右最大) - 当前高度
    ans += Math.min(lMax, rMax) - height[i];
  }
  return ans;
}

// 动态规划：预处理每个位置左侧最大和右侧最大高度，空间换时间
function trapV2(height) {
  if (!height.length) return 0;
  const n = height.length;
  // lMax[i] 记录i左侧（含i）最大高度
  let lMax = Array(n).fill(0), rMax = Array(n).fill(0);
  lMax[0] = height[0];
  // 从左到右预处理左最大高度
  for (let i = 1; i < n; i++) lMax[i] = Math.max(height[i], lMax[i - 1]);
  rMax[n - 1] = height[n - 1];
  // 从右到左预处理右最大高度
  for (let i = n - 2; i >= 0; i--) rMax[i] = Math.max(height[i], rMax[i + 1]);
  let ans = 0;
  // 枚举每个位置，计算能接的水量
  for (let i = 1; i < n - 1; i++) {
    ans += Math.min(lMax[i], rMax[i]) - height[i];
  }
  return ans;
}

// 单调栈：维护一个递减栈，遇到比栈顶高的位置时计算能接的水量
function trap(height) {
  let ans = 0, stack = [], n = height.length;
  // 遍历每个位置
  for (let i = 0; i < n; i++) {
    // 当前高度大于栈顶，说明可以形成凹槽，计算水量
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      let top = stack.pop(); // 凹槽底部
      if (!stack.length) break; // 没有左边界则跳出
      let left = stack[stack.length - 1]; // 左边界
      let width = i - left - 1; // 距离
      let h = Math.min(height[left], height[i]) - height[top]; // 高度差
      ans += width * h; // 累加水量
    }
    stack.push(i); // 当前下标入栈
  }
  return ans;
}

// 导出三种实现
module.exports = { trap, trapV0, trapV2 };