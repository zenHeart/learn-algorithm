---
title: 排序与搜索
order: 8
tags: [排序, 二分查找, 归并, 快速排序, 堆排序]
difficulty: 中等
---

# 排序与搜索

排序和搜索是算法的"原语"。理解它们不仅能解决专门问题，还能为更高级的算法（二分、归并排序思想用于逆序对）提供基础。

## 1. 排序算法全景

| 算法 | 平均 | 最坏 | 空间 | 稳定 | 适用场景 |
|------|------|------|------|------|----------|
| 冒泡排序 | O(n²) | O(n²) | O(1) | ✓ | 教学、小数据 |
| 选择排序 | O(n²) | O(n²) | O(1) | ✗ | 交换成本高 |
| 插入排序 | O(n²) | O(n²) | O(1) | ✓ | 基本有序数据 |
| 希尔排序 | O(n log²n) | O(n²) | O(1) | ✗ | 中等规模 |
| 归并排序 | O(n log n) | O(n log n) | O(n) | ✓ | 大数据、稳定 |
| 快速排序 | O(n log n) | O(n²) | O(log n) | ✗ | 通用首选 |
| 堆排序 | O(n log n) | O(n log n) | O(1) | ✗ | 内存敏感 |
| 计数排序 | O(n + k) | O(n + k) | O(k) | ✓ | 小范围整数 |
| 基数排序 | O(nk) | O(nk) | O(n + k) | ✓ | 字符串/整数 |
| 桶排序 | O(n + k) | O(n²) | O(n + k) | ✓ | 均匀分布数据 |

### 1.1 冒泡排序

```javascript
function bubbleSort(arr) {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swapped = true
      }
    }
    if (!swapped) break
  }
  return arr
}
```

### 1.2 快速排序

```javascript
function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return arr
  const pivot = arr[hi]
  let i = lo - 1
  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
  ;[arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]
  const p = i + 1
  quickSort(arr, lo, p - 1)
  quickSort(arr, p + 1, hi)
  return arr
}
```

**优化**：

- 三数取中（避免有序输入退化）
- 随机化 pivot
- 小数组切换为插入排序

### 1.3 归并排序

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = arr.length >> 1
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

function merge(a, b) {
  const res = []
  let i = 0, j = 0
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) res.push(a[i++])
    else res.push(b[j++])
  }
  return res.concat(a.slice(i), b.slice(j))
}
```

**应用**：

- 求逆序对数（`O(n log n)`，比冒泡 `O(n²)` 快）
- 链表排序（用归并比快排稳定）
- 外部排序（数据量超过内存）

### 1.4 堆排序

```javascript
function heapSort(arr) {
  const n = arr.length
  // 建堆（自下而上）
  for (let i = (n >> 1) - 1; i >= 0; i--) siftDown(arr, i, n)
  // 排序
  for (let i = n - 1; i > 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    siftDown(arr, 0, i)
  }
  return arr
}

function siftDown(arr, start, end) {
  let root = start
  while ((root << 1) + 1 < end) {
    let child = (root << 1) + 1
    if (child + 1 < end && arr[child] < arr[child + 1]) child++
    if (arr[root] >= arr[child]) return
    ;[arr[root], arr[child]] = [arr[child], arr[root]]
    root = child
  }
}
```

## 2. 排序的稳定性

**稳定排序**：相等元素的相对顺序在排序后不变。

应用场景：

- 多级排序：先按姓名排，再按年龄排
- 订单按时间排，再按金额排
- 数据库排序经常要求稳定

| 稳定 | 不稳定 |
|------|--------|
| 冒泡、插入、归并、计数、基数、桶 | 选择、希尔、快速、堆 |

## 3. 排序选择原则

1. **小数据**（n < 50）：插入排序
2. **通用**：内省排序（快排 + 堆排 + 插入排序混合）
3. **稳定性要求**：归并排序
4. **内存敏感**：堆排序
5. **范围有限的整数**：计数排序
6. **字符串/固定长度整数**：基数排序

JS `Array.prototype.sort` 在 V8 中使用 **TimSort**（归并 + 插入），保证 O(n log n) 且稳定。

## 4. 搜索

### 4.1 线性搜索

O(n)，无序数据唯一选择。

### 4.2 二分搜索

前提：**有序**。O(log n)。

```javascript
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1
  while (lo <= hi) {
    const mid = (lo + hi) >> 1
    if (arr[mid] === target) return mid
    if (arr[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  return -1
}
```

**变体**：

- 找第一个 ≥ target 的位置（`lower_bound`）
- 找最后一个 ≤ target 的位置（`upper_bound`）
- 旋转排序数组中搜索（先用一次二分找旋转点）

### 4.3 二分答案

把"找最优解"转为"判断可行性"：

```javascript
// 875. 爱吃香蕉的珂珂
function minEatingSpeed(piles, h) {
  let lo = 1, hi = Math.max(...piles)
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    let hours = 0
    for (const p of piles) hours += Math.ceil(p / mid)
    if (hours <= h) hi = mid
    else lo = mid + 1
  }
  return lo
}
```

判断函数单调 → 用二分搜索最小可行解。

## 5. 高级主题

### 5.1 外部排序

数据量超过内存时：

1. 把数据分成若干块，每块能装入内存
2. 每块内排序
3. 多路归并（用 K 路最小堆或败者树）

### 5.2 索引排序

不直接交换元素，记录"应该去的位置"。空间换时间，避免大规模数据搬迁。

```javascript
function indexSort(arr) {
  return arr.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]).map(([, i]) => arr[i])
}
```

## 6. 复杂度

| 类别 | 时间下界 | 备注 |
|------|----------|------|
| 比较排序 | O(n log n) | 决策树证明 |
| 计数排序 | O(n + k) | 非比较，k 为值域 |
| 基数排序 | O(nk) | k 为位数 |

## 7. 可视化建议

排序可视化是教学价值最高的一类：

- 用**柱状图**显示数据，柱高 = 值大小
- **比较**：黄色高亮两个待比较柱
- **交换**：红色脉冲 + 位置互换动画
- **已排序**：绿色锁定不再移动
- 配合**播放/暂停/步进/重置**控件

## 8. 练手题目

- [88. 合并两个有序数组](/leetcode/88.merge-sorted-array)
- [34. 在排序数组中查找元素的第一个和最后一个位置](/leetcode/34.find-first-and-last-position-of-element-in-sorted-array)
- [35. 搜索插入位置](/leetcode/35.search-insert-position)
- [69. x 的平方根](/leetcode/69.sqrtx)
- [162. 寻找峰值](/leetcode/162.find-peak-element)
- [215. 数组中的第 K 个最大元素](/leetcode/215) — 待补充

## 9. 小结

排序和搜索是基础也是工具。掌握归并（稳定 + 逆序对）、快排（平均最优）、堆排（内存敏感）、二分（O(log n)）这四种武器，足以应对 90% 的工程场景。
