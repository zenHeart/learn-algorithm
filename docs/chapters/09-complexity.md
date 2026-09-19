---
title: 算法复杂度分析
order: 9
tags: [大 O, 时间复杂度, 空间复杂度, 摊还分析]
difficulty: 入门
---

# 算法复杂度分析

复杂度分析是评估算法的"标尺"。它回答两个问题：

1. **这个算法快不快？**（时间复杂度）
2. **这个算法费不费内存？**（空间复杂度）

面试中，正确的复杂度分析是写出最优解的前提——你得先知道自己写的是 O(n) 还是 O(n²)，才知道有没有更好的方案。

## 1. 大 O 表示法

大 O 描述**输入规模 n 趋近无穷时**算法运行时间的上界。忽略常数和低阶项：

```
T(n) = 3n² + 5n + 100  →  O(n²)
T(n) = 0.5n log n + 2n  →  O(n log n)
T(n) = 2ⁿ + n³  →  O(2ⁿ)
```

### 1.1 常见复杂度排序

由快到慢：

| 复杂度 | 名称 | n=10 | n=100 | n=10⁶ |
|--------|------|------|-------|-------|
| O(1) | 常数 | 1 | 1 | 1 |
| O(log n) | 对数 | 3 | 7 | 20 |
| O(√n) | 平方根 | 3 | 10 | 1000 |
| O(n) | 线性 | 10 | 100 | 10⁶ |
| O(n log n) | 线性对数 | 30 | 700 | 2·10⁷ |
| O(n²) | 平方 | 100 | 10⁴ | 10¹² |
| O(n³) | 立方 | 1000 | 10⁶ | 10¹⁸ |
| O(2ⁿ) | 指数 | 1024 | 10³⁰ | — |
| O(n!) | 阶乘 | 3.6·10⁶ | — | — |

> 提醒：O(1) 不等于"只执行一次"，而是"不随输入规模增长"。

### 1.2 渐进符号

- **O（上界）**：T(n) ≤ c·f(n)
- **Ω（下界）**：T(n) ≥ c·f(n)
- **Θ（紧界）**：T(n) = Θ(f(n))，上下界同阶
- **o（小 o）**：T(n) / f(n) → 0

> 例：归并排序**最坏情况** T(n) = Θ(n log n)，二分搜索 T(n) = Θ(log n)。

## 2. 时间复杂度分析

### 2.1 循环

```javascript
// O(n)
for (let i = 0; i < n; i++) { ... }

// O(n²)
for (let i = 0; i < n; i++)
  for (let j = 0; j < n; j++) { ... }

// O(log n) — i 翻倍
for (let i = 1; i < n; i *= 2) { ... }

// O(n log n) — 外层 n，内层 log n
for (let i = 0; i < n; i++)
  for (let j = 1; j < n; j *= 2) { ... }
```

### 2.2 递归

用**主定理（Master Theorem）**：

```
T(n) = a·T(n/b) + f(n)
```

| f(n) | 复杂度 |
|------|--------|
| O(n^(log_b a - ε)) | T(n) = Θ(n^log_b a) |
| O(n^log_b a · log^k n) | T(n) = Θ(n^log_b a · log^(k+1) n) |
| O(n^(log_b a + ε)) | T(n) = Θ(f(n)) |

常见情况：

- 二分：T(n) = T(n/2) + O(1) → O(log n)
- 归并：T(n) = 2T(n/2) + O(n) → O(n log n)
- 快排平均：T(n) = 2T(n/2) + O(n) → O(n log n)
- Karatsuba：T(n) = 3T(n/2) + O(n) → O(n^log₂3) ≈ O(n^1.585)

### 2.3 摊还分析（Amortized）

某些操作单独看是 O(n)，但**重复多次**后平均是 O(1)：

```javascript
// 动态数组 push：偶尔扩容 O(n)，整体摊还 O(1)
class DynamicArray {
  push(x) {
    if (this.size === this.cap) {
      this.cap *= 2  // 扩容
      // 拷贝是 O(n)，但下一次扩容要 2n 次 push 才发生
    }
    this.arr[this.size++] = x
  }
}
```

摊还分析方法：

1. **总成本法**：n 次操作总成本 = T(n)，平均 = T(n) / n
2. **会计法**：给每次"便宜"操作存钱，付"贵"操作的开销
3. **势能法**：定义势能函数，分析 `ΔΦ + 操作成本`

## 3. 空间复杂度

空间复杂度包括：

- **输入空间**：输入数据本身（一般不计入）
- **辅助空间**：算法临时使用的额外空间
- **输出空间**：返回结果的空间（视情况计入）

### 3.1 常见空间复杂度

```javascript
// O(1) 辅助空间
function reverse(arr) {
  let i = 0, j = arr.length - 1
  while (i < j) [arr[i++], arr[j--]] = [arr[j], arr[i]]
}

// O(n) 递归栈
function factorial(n) {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

// O(log n) 递归栈（二分）
function binarySearch(arr, target, lo = 0, hi = arr.length - 1) {
  if (lo > hi) return -1
  const mid = (lo + hi) >> 1
  if (arr[mid] === target) return mid
  return arr[mid] < target
    ? binarySearch(arr, target, mid + 1, hi)
    : binarySearch(arr, target, lo, mid - 1)
}
```

### 3.2 空间换时间

经典 trade-off：

| 场景 | 时间 | 空间 |
|------|------|------|
| 缓存 | 减少 O(n) → O(1) | 增加 O(n) |
| 哈希表 | O(1) 查找 | O(n) |
| DP 表 | O(n) 重复利用 | O(n) |
| 备忘录 | 避免重复计算 | 存储中间结果 |

## 4. 最坏、平均、最好

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i
  }
  return -1
}
```

- **最坏情况**：target 在末尾或不存在 → O(n)
- **最好情况**：target 在头部 → O(1)
- **平均情况**：假设均匀分布 → O(n)

> 算法题中通常要求**最坏复杂度**，所以"快排平均 O(n log n)，最坏 O(n²)"的题目不能只用快排。

## 5. 复杂度对比表

### 5.1 排序

| 算法 | 时间（平均） | 时间（最坏） | 空间 | 稳定 |
|------|--------------|--------------|------|------|
| 冒泡 | O(n²) | O(n²) | O(1) | ✓ |
| 插入 | O(n²) | O(n²) | O(1) | ✓ |
| 归并 | O(n log n) | O(n log n) | O(n) | ✓ |
| 快速 | O(n log n) | O(n²) | O(log n) | ✗ |
| 堆排 | O(n log n) | O(n log n) | O(1) | ✗ |

### 5.2 搜索

| 数据结构 | 查找 | 插入 | 删除 |
|----------|------|------|------|
| 数组 | O(n) | O(n) | O(n) |
| 有序数组 + 二分 | O(log n) | O(n) | O(n) |
| 哈希表 | O(1) | O(1) | O(1) |
| 平衡 BST | O(log n) | O(log n) | O(log n) |

### 5.3 图

| 算法 | 时间 | 空间 |
|------|------|------|
| DFS / BFS | O(n + m) | O(n) |
| Dijkstra | O((n + m) log n) | O(n) |
| Bellman-Ford | O(nm) | O(n) |
| Floyd-Warshall | O(n³) | O(n²) |

## 6. 常见错误

### 6.1 误把 API 当 O(1)

```javascript
// JS Array 的一些"陷阱"：
arr.shift()       // O(n)，不是 O(1)
arr.unshift(x)    // O(n)
arr.splice(0, 1)  // O(n)
arr.indexOf(x)    // O(n)
new Array(n)      // O(n) 分配
```

### 6.2 忽略递归栈

```javascript
// 这个递归是 O(n) 栈空间
function deepRecurse(n) {
  if (n <= 0) return
  return deepRecurse(n - 1)
}
```

### 6.3 误把分摊当最坏

JS 数组 push 大多数情况是 O(1)，但扩容时是 O(n)。这没关系——整体摊还 O(1)，但**单次操作**最坏仍是 O(n)。

## 7. 实操建议

1. **写代码前估算**：每个循环层、每次递归
2. **对比方案**：O(n²) vs O(n log n) 在 n=10⁶ 时差 10⁴ 倍
3. **考虑常数**：O(n) 但常数很大可能输给 O(n log n) 的实现在小数据上
4. **空间-时间 trade-off**：DP 用空间换时间是常见手法
5. **看数据规模**：
   - n ≤ 20：可考虑 O(2ⁿ)
   - n ≤ 10⁴：O(n²) 可行
   - n ≤ 10⁶：必须 O(n) 或 O(n log n)
   - n ≤ 10⁹：必须 O(log n) 或 O(1)

## 8. 可视化建议

复杂度可视化的最佳形式是**双对数坐标**：

- x 轴（输入规模 n）和 y 轴（运行时间）都用对数
- 这样 O(1) / O(log n) / O(n) / O(n²) 都呈现为不同斜率的直线
- 配合实际运行时间散点，验证理论分析

## 9. 小结

复杂度分析不是纸上谈兵——它决定了一个算法能否在限定时间内解决问题。养成"写代码前先估算"的习惯：先想清楚是 O(n) 还是 O(n²)，再决定是否需要优化。
