# JavaScript 算法学习资源指南

## 概述

本文档整理自 [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)，这是一个用 JavaScript 实现的算法和数据结构仓库。

## 仓库概览

- **Stars**: 170k+
- **语言**: JavaScript/TypeScript
- **涵盖**: 常见算法、数据结构、复杂度分析

## 核心内容

### 1. 数据结构

#### 线性结构
- **链表 (Linked Lists)**: 单向链表、双向链表
- **栈 (Stacks)**: 基于数组、基于链表
- **队列 (Queues)**: 普通队列、双端队列、优先队列
- **哈希表 (Hash Tables)**: 拉链法、开放寻址法

#### 树形结构
- **二叉树 (Binary Trees)**: 前序、中序、后序遍历
- **二叉搜索树 (BST)**: 查找、插入、删除
- **AVL 树**: 自平衡二叉搜索树
- **红黑树**: 自平衡二叉搜索树
- **堆 (Heaps)**: 最大堆、最小堆、优先队列实现
- **Trie 树**: 前缀树

#### 图结构
- **图的表示**: 邻接矩阵、邻接表
- **图的遍历**: BFS、DFS
- **最短路径**: Dijkstra、Bellman-Ford、Floyd-Warshall
- **生成树**: Prim、Kruskal

### 2. 算法分类

#### 排序算法
| 算法 | 时间复杂度 | 空间复杂度 | 稳定性 |
|------|----------|----------|-------|
| 冒泡排序 | O(n²) | O(1) | 稳定 |
| 选择排序 | O(n²) | O(1) | 不稳定 |
| 插入排序 | O(n²) | O(1) | 稳定 |
| 归并排序 | O(n log n) | O(n) | 稳定 |
| 快速排序 | O(n log n) | O(log n) | 不稳定 |
| 堆排序 | O(n log n) | O(1) | 不稳定 |

#### 搜索算法
- **二分查找**: O(log n)，适用于有序数组
- **深度优先搜索 (DFS)**: 递归/迭代
- **广度优先搜索 (BFS)**: 队列实现

#### 动态规划
- **斐波那契数列**: 自底向上、自顶向下、记忆化
- **背包问题**: 0/1 背包、完全背包、多重背包
- **最长公共子序列 (LCS)**
- **最长递增子序列 (LIS)**

#### 字符串算法
- **字符串匹配**: KMP、Boyer-Moore、Rabin-Karp
- **回文**: 判断、最长回文子串
- **编辑距离**: Levenshtein Distance

### 3. 复杂度分析

#### 时间复杂度速查
```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
```

#### 主定理 (Master Theorem)
```
T(n) = aT(n/b) + f(n)
- 如果 f(n) = O(n^log_b(a-ε)), 则 T(n) = Θ(n^log_b(a))
- 如果 f(n) = Θ(n^log_b(a)), 则 T(n) = Θ(n^log_b(a) log n)
- 如果 f(n) = Ω(n^log_b(a+ε)), 则 T(n) = Θ(f(n))
```

### 4. LeetCode 经典题目

#### 简单难度
- #1 两数之和
- #20 有效括号
- #21 合并两个有序链表
- #26 删除排序数组中的重复项
- #27 移除元素

#### 中等难度
- #3 无重复字符的最长子串
- #5 最长回文子串
- #15 三数之和
- #17 电话号码的字母组合
- #33 搜索旋转排序数组

#### 困难难度
- #10 正则表达式匹配
- #23 合并K个有序链表
- #42 接雨水
- #51 N 皇后

### 5. 学习建议

#### 入门路线
```
1. 数组 → 2. 链表 → 3. 栈/队列 → 4. 哈希表 → 
5. 二叉树 → 6. 图 → 7. 回溯 → 8. 动态规划
```

#### 刷题策略
1. **按类别刷**: 集中攻克同一类型的题目
2. **总结模板**: 如二分查找模板、回溯模板、动态规划模板
3. **复杂度分析**: 每道题都要分析时间和空间复杂度

### 6. 代码模板

#### 二分查找模板
```javascript
function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}
```

#### 快排模板
```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivot = partition(arr, left, right);
    quickSort(arr, left, pivot - 1);
    quickSort(arr, pivot + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
```

## 相关资源

- [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)
- [LeetCode 中国](https://leetcode.cn/)
- [算法可视化](https://algorithm-visualizer.org/)

## 更新日志

- 2026-04-19：初始文档，基于 trekhleb/javascript-algorithms 整理
