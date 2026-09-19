---
title: 哈希表
order: 4
tags: [哈希表, 冲突解决, 哈希函数, LRU]
difficulty: 中等
---

# 哈希表

哈希表（Hash Table）以**空间换时间**，在平均 O(1) 的时间内完成插入、查找、删除。它是面试中"最快"的查找结构，但有几个关键点容易被忽略：哈希函数设计、冲突解决策略、装载因子与扩容。

## 1. 哈希表原理

哈希表的核心是：

1. **哈希函数** `h(key)`：把任意 key 映射到 `[0, m)` 的桶下标
2. **桶数组** `T[0..m-1]`：存放键值对
3. **冲突解决**：不同 key 映射到同一桶时的处理策略

理想情况下 `h` 是均匀分布的，每个桶期望存放 `n/m` 个元素（装载因子 α = n/m）。

## 2. 哈希函数

### 2.1 整数哈希

- **除法哈希**：`h(k) = k mod m`，要求 m 是质数且远离 2 的幂
- **乘法哈希**：`h(k) = floor(m * frac(k * A))`，A 取 `(sqrt(5) - 1) / 2` 效果较好

### 2.2 字符串哈希

把字符串当成 base 进制数：

```javascript
function hashString(s, m) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) % m
  }
  return h
}
```

常用 base：`31`（Java String）、`131` / `137`（抗碰撞更强）。

### 2.3 JS Map 的实现

V8 的 Map 在元素少时是**有序链表**（小表），达到阈值后切换为**哈希表**。它不暴露哈希函数，所有 key 都可以是对象且保持插入顺序。

## 3. 冲突解决

### 3.1 链地址法（Chaining）

每个桶维护一个链表，所有映射到该桶的 key 串起来。

```
[0] -> (k1,v1) -> (k4,v4)
[1] -> (k2,v2)
[2] -> null
[3] -> (k3,v3) -> (k5,v5)
```

查找 / 删除的期望时间是 O(1 + α)。当 α 过大时扩容（rehash）。

### 3.2 开放地址法（Open Addressing）

所有元素直接存放在桶数组里，冲突时按某种**探测序列**找下一个空位。

- **线性探测**：`h, h+1, h+2, ...`，容易产生**主簇（primary clustering）**
- **二次探测**：`h, h+1, h+4, h+9, ...`，缓解主簇但有次簇
- **双重哈希**：`h1(k) + i * h2(k)`，分布最好，h2 不能为 0

### 3.3 链地址 vs 开放地址

| 特性 | 链地址法 | 开放地址法 |
|------|----------|------------|
| 实现复杂度 | 简单 | 中等 |
| 缓存友好 | 链表差 | 数组好 |
| 删除支持 | 简单 | 需"墓碑"标记 |
| 高 α 表现 | 仍可工作 | 性能急剧下降 |
| 典型装载因子 | ≤ 1 | ≤ 0.7 |

Java `HashMap` 用链地址 + 红黑树（链表长 ≥ 8 转树），Python `dict` 用开放地址（伪随机探测）。

## 4. 扩容与重哈希

当装载因子超过阈值（Java HashMap = 0.75），需要：

1. 分配新桶数组（容量翻倍）
2. 遍历旧桶，重新计算每个 key 的新桶下标
3. 插入到新桶

扩容是 O(n) 操作，但因为摊还后单次操作仍是 O(1)，被分摊到多次操作中。

## 5. 哈希表 vs 其他结构

| 操作 | 哈希表 | 有序数组 + 二分 | 平衡 BST | 跳表 |
|------|--------|----------------|----------|------|
| 插入 | O(1) | O(n) | O(log n) | O(log n) |
| 查找 | O(1) | O(log n) | O(log n) | O(log n) |
| 删除 | O(1) | O(n) | O(log n) | O(log n) |
| 顺序遍历 | O(n) | O(n) | O(n) | O(n) |
| 范围查询 | O(n + k) | O(log n + k) | O(log n + k) | O(log n + k) |

哈希表**不支持有序遍历**。需要范围查询或按 key 排序时，选用 TreeMap / SortedDict。

## 6. 典型问题

### 6.1 两数之和

```javascript
function twoSum(nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) return [map.get(target - nums[i]), i]
    map.set(nums[i], i)
  }
}
```

时间 O(n)，空间 O(n)。

### 6.2 字母异位词分组

```javascript
function groupAnagrams(strs) {
  const map = new Map()
  for (const s of strs) {
    const key = s.split('').sort().join('')
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(s)
  }
  return [...map.values()]
}
```

排序 key 是 O(k log k)，可以用字符计数 O(k) 优化。

### 6.3 最长连续序列

```javascript
function longestConsecutive(nums) {
  const set = new Set(nums)
  let longest = 0
  for (const n of set) {
    if (!set.has(n - 1)) {  // 只从序列起点开始
      let len = 1, cur = n
      while (set.has(cur + 1)) { cur++; len++ }
      longest = Math.max(longest, len)
    }
  }
  return longest
}
```

时间 O(n)，空间 O(n)。

### 6.4 LRU 缓存

参见 [146. LRU 缓存](/leetcode/146.lru-cache)。LRU = 哈希表 + 双向链表：

- 哈希表 O(1) 定位节点
- 双向链表 O(1) 移到头部 / 删除尾部
- 哨兵节点消除空判

## 7. 可视化建议

哈希表可视化最有价值的是展示**冲突解决**：

- 链地址法：用横向链表展示每个桶
- 开放地址法：用动画展示探测序列
- 扩容：用对比展示容量翻倍前后 key 的分布

## 8. 常见陷阱

- **哈希函数不均匀**：自定义 key 必须实现 `hashCode` / 用稳定序列化
- **可变对象作为 key**：JS Map 用引用相等，对象内容变化不影响 hash
- **哈希攻击**：恶意输入可让所有 key 哈希到同一桶；生产环境用**加密哈希**（如 SipHash）
- **装载因子**：α 越接近 1 性能越差；务必扩容

## 9. 练手题目

- [1. 两数之和](/leetcode/1.two-sum)
- [49. 字母异位词分组](/leetcode/49.group-anagrams)
- [128. 最长连续序列](/leetcode/128.longest-consecutive-sequence)
- [146. LRU 缓存](/leetcode/146.lru-cache)
- [LRU 实现](docs/algorithms/99.other/LRU/index.js)

## 10. 小结

哈希表是平均 O(1) 的查找结构，但**最坏情况是 O(n)**。在算法题中通常是首选，但有序遍历、范围查询、确定性最坏复杂度场景要避开它。
