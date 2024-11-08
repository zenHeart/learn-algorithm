---
title: 算法复杂度分析
description: 深入理解时间复杂度和空间复杂度
tags: [复杂度, 分析, Big O]
weight: 1
difficulty: medium
---

# 算法复杂度分析

算法复杂度是衡量算法效率的重要指标，主要包括时间复杂度和空间复杂度。

## 🕐 时间复杂度

时间复杂度描述了算法执行时间与输入规模的关系。

### Big O 表示法

| 复杂度 | 名称 | 例子 |
|--------|------|------|
| O(1) | 常数时间 | 访问数组元素 |
| O(log n) | 对数时间 | 二分搜索 |
| O(n) | 线性时间 | 遍历数组 |
| O(n log n) | 线性对数时间 | 归并排序 |
| O(n²) | 平方时间 | 冒泡排序 |
| O(2ⁿ) | 指数时间 | 递归斐波那契 |

## 💾 空间复杂度

空间复杂度描述了算法所需额外存储空间与输入规模的关系。

<InfoBox type="info" title="空间复杂度注意事项">
空间复杂度通常不包括输入数据本身占用的空间，只计算算法额外需要的空间。
</InfoBox>

## 📈 复杂度比较

```javascript
// O(1) - 常数时间
function getFirst(arr) {
  return arr[0];
}

// O(n) - 线性时间
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// O(n²) - 平方时间
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

## 🧮 数学分析

对于递归算法，我们通常使用递推关系来分析复杂度：

$$T(n) = aT(n/b) + f(n)$$

其中：
- $a$ 是子问题的数量
- $n/b$ 是每个子问题的规模
- $f(n)$ 是分治过程的代价

## 🎯 实践建议

<InfoBox type="success" title="分析技巧">
1. 识别基本操作
2. 计算基本操作的执行次数
3. 找出增长率最快的项
4. 忽略常数因子和低阶项
</InfoBox>

<InfoBox type="warning" title="常见误区">
不要只关注最坏情况，也要考虑平均情况和最好情况。
</InfoBox>

---

掌握复杂度分析是算法学习的基础，继续学习具体的算法实现吧！
