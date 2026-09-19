---
title: 数组与字符串
order: 1
tags: [数组, 字符串, 双指针, 滑动窗口]
difficulty: 入门
---

# 数组与字符串

数组和字符串是算法题中最高频的数据形态——几乎所有高级数据结构与算法都以它们为基础。本章梳理数组/字符串上的核心操作模式、典型问题与复杂度边界。

## 1. 数组基础

### 1.1 存储模型

数组是**连续内存**上的一段同构数据。在 JavaScript 中 `Array` 实际上是动态数组（哈希表 + 连续缓冲），而 `TypedArray` 才是真正的连续内存布局。

| 特性 | 静态数组 | 动态数组（JS Array） |
|------|----------|----------------------|
| 随机访问 | O(1) | O(1)（摊销） |
| 尾部追加 | O(1) | O(1) 摊销，扩容时 O(n) |
| 头部插入 | O(n) | O(n) |
| 中间插入/删除 | O(n) | O(n) |

### 1.2 双指针

双指针是数组题最常用的技巧，把 O(n²) 的暴力降到 O(n)。

**对撞指针**：从两端向中间推进，适用于有序数组的两数之和、三数之和、接雨水、盛最多水的容器。

```javascript
// 167. 两数之和 II - 输入有序数组
function twoSum(numbers, target) {
  let lo = 0, hi = numbers.length - 1
  while (lo < hi) {
    const sum = numbers[lo] + numbers[hi]
    if (sum === target) return [lo + 1, hi + 1]
    if (sum < target) lo++
    else hi--
  }
  return [-1, -1]
}
```

**快慢指针**：同向不同速，适用于原地去重、判断链表环、移除元素。

```javascript
// 26. 删除有序数组中的重复项
function removeDuplicates(nums) {
  let slow = 0
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++
      nums[slow] = nums[fast]
    }
  }
  return slow + 1
}
```

### 1.3 滑动窗口

滑动窗口是**双指针 + 范围维护**的特例，固定窗口求最值、可变窗口求满足条件的最短/最长长度。

```javascript
// 3. 无重复字符的最长子串
function lengthOfLongestSubstring(s) {
  const map = new Map()
  let left = 0, max = 0
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) left = Math.max(left, map.get(s[right]) + 1)
    map.set(s[right], right)
    max = Math.max(max, right - left + 1)
  }
  return max
}
```

## 2. 字符串基础

字符串在底层是**只读字符数组**。但 JS 字符串是不可变值类型，所有"修改"操作都返回新串。

### 2.1 字符串 vs 字符数组

| 操作 | 字符串 | 字符数组 |
|------|--------|----------|
| 索引访问 | O(1) | O(1) |
| 拼接 | O(n)（产生新串） | O(1) 原地修改 |
| 切片 | O(n) | O(n) |
| 包含 | O(n) | O(n) |

> 提醒：JS 中 `str[i]` 只读，修改需 `str.slice(0, i) + ch + str.slice(i+1)`，或在循环中改用数组再 `join('')`。

### 2.2 高频字符串算法

- **KMP**：`O(n + m)` 的子串查找，利用最长相等前后缀表跳过无效比较
- **Rabin-Karp**：滚动哈希的子串查找，平均 O(n + m)
- **Manacher**：`O(n)` 求最长回文子串
- **Z 函数**：`O(n)` 求串与各后缀的最长公共前缀

## 3. 典型问题与时间复杂度

| 问题 | 暴力 | 优化思路 | 目标复杂度 |
|------|------|----------|------------|
| 两数之和 | O(n²) 枚举 | 哈希表一次扫描 | O(n) |
| 三数之和 | O(n³) | 排序 + 对撞指针，跳重 | O(n²) |
| 接雨水 | O(n²) 每个位置找左右最大 | 双指针 / 前后缀数组 | O(n) |
| 最长无重复子串 | O(2ⁿ) 子集枚举 | 滑动窗口 + 哈希 | O(n) |
| 编辑距离 | O(3ⁿ) | 二维 DP | O(nm) |

## 4. 边界与陷阱

- **空数组**：`nums = []` 时多数函数应返回 0、-1 或空集，不能崩
- **重复元素**：去重逻辑必须考虑 `[1,1,2]` 这种 1 出现多次的输入
- **整数溢出**：JS 安全的整数范围是 ±2⁵³-1，做大数运算需用 `BigInt`
- **原地修改 vs 返回新数组**：读题时务必确认函数签名约束

## 5. 可视化建议

数组上的算法非常适合用柱状图表达：

- **排序**：用条形高度表示数值大小，颜色标注比较/交换/已排序
- **二分查找**：在数组下方高亮 `[lo, hi]` 区间，标记 `mid` 位置
- **滑动窗口**：用上方弧线标出当前窗口范围

## 6. 练手题目

- [1. 两数之和](/leetcode/1.two-sum)
- [15. 三数之和](/leetcode/15) — 待补充
- [26. 删除有序数组中的重复项](/leetcode/26.remove-duplicates-from-sorted-array)
- [27. 移除元素](/leetcode/27.remove-element)
- [88. 合并两个有序数组](/leetcode/88.merge-sorted-array)
- [189. 旋转数组](/leetcode/189.rotate-array)

## 7. 小结

数组与字符串是算法的"画布"。掌握双指针与滑动窗口后，O(n²) 的暴力题几乎都能优化到 O(n)；当数据有序时优先考虑二分。这两类题的目标是**第一遍就写出最优解**，而不是先写暴力再优化。
