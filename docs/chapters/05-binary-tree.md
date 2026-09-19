---
title: 二叉树
order: 5
tags: [二叉树, BFS, DFS, 遍历]
difficulty: 中等
---

# 二叉树

二叉树是树形结构的入门款，每个节点最多两个孩子。它的递归结构与递归算法天然契合，是分治、回溯、动态规划的重要载体。

## 1. 树的术语

- **根节点（root）**：树的入口
- **度（degree）**：节点的子树个数
- **深度（depth）**：根到节点的路径长度（根深度 0）
- **高度（height）**：节点到最深叶子的路径长度（叶子高度 0）
- **层（level）**：根为 0 层，子节点为 1 层
- **叶子（leaf）**：度为 0 的节点

## 2. 二叉树的存储

### 2.1 链式存储

```javascript
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}
```

### 2.2 顺序存储（堆）

完全二叉树可以用数组紧凑存储：

- 节点 `i` 的左孩子 `2i+1`，右孩子 `2i+2`
- 父节点 `(i-1) >> 1`

非完全二叉树会有"洞"，浪费空间。

## 3. 二叉树遍历

### 3.1 深度优先（DFS）

| 顺序 | 访问规则 | 应用 |
|------|----------|------|
| 前序 | 根 → 左 → 右 | 复制树、序列化 |
| 中序 | 左 → 根 → 右 | BST 升序输出 |
| 后序 | 左 → 右 → 根 | 释放内存、计算子树和 |

```javascript
// 递归前序
function preorder(root, res = []) {
  if (!root) return res
  res.push(root.val)
  preorder(root.left, res)
  preorder(root.right, res)
  return res
}

// 迭代前序（用栈）
function preorderIter(root) {
  const res = []
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    res.push(node.val)
    stack.push(node.right)
    stack.push(node.left)
  }
  return res
}
```

### 3.2 广度优先（BFS / 层序）

用队列实现：

```javascript
function levelOrder(root) {
  if (!root) return []
  const res = []
  const queue = [root]
  while (queue.length) {
    const level = []
    for (let i = 0, n = queue.length; i < n; i++) {
      const node = queue.shift()
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(level)
  }
  return res
}
```

时间 O(n)，空间 O(n)（队列最大长度 = 最宽一层节点数）。

## 4. 二叉搜索树（BST）

BST 满足：**左子树所有节点 < 根 < 右子树所有节点**。中序遍历得到升序序列。

### 4.1 搜索

```javascript
function searchBST(root, val) {
  if (!root || root.val === val) return root
  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val)
}
```

### 4.2 插入

```javascript
function insertIntoBST(root, val) {
  if (!root) return new TreeNode(val)
  if (val < root.val) root.left = insertIntoBST(root.left, val)
  else root.right = insertIntoBST(root.right, val)
  return root
}
```

### 4.3 删除

最复杂：要分三种情况——叶子、单孩子、双孩子。双孩子时用**右子树最小节点**（或左子树最大节点）替换。

### 4.4 BST 退化

普通 BST 在有序数据下退化为链表（高 O(n)）。解决方案：

- **AVL**：严格平衡，查找 O(log n)，插入删除旋转多
- **红黑树**：近似平衡，插入删除旋转少，Java TreeMap / C++ map 选用
- **Treap / Splay**：用随机化或访问局部性换取实现简单

## 5. 经典问题

### 5.1 最大深度

```javascript
function maxDepth(root) {
  if (!root) return 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}
```

### 5.2 翻转二叉树

```javascript
function invertTree(root) {
  if (!root) return null
  ;[root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
  return root
}
```

### 5.3 最近公共祖先（LCA）

```javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)
  if (left && right) return root
  return left || right
}
```

### 5.4 路径总和

```javascript
function hasPathSum(root, target) {
  if (!root) return false
  if (!root.left && !root.right) return root.val === target
  return hasPathSum(root.left, target - root.val) ||
         hasPathSum(root.right, target - root.val)
}
```

## 6. 复杂度

| 操作 | 普通 BST（平均/最坏） | AVL | 红黑树 |
|------|---------------------|-----|--------|
| 搜索 | O(log n) / O(n) | O(log n) | O(log n) |
| 插入 | O(log n) / O(n) | O(log n) | O(log n) |
| 删除 | O(log n) / O(n) | O(log n) | O(log n) |

## 7. 可视化建议

- **DFS 遍历**：用高亮颜色在节点上沿访问路径动画
- **BFS 遍历**：用层级波纹效果逐层点亮
- **BST 操作**：当前比较节点用黄色，已访问路径用绿色箭头标出
- **平衡旋转**：用双圆展示旋转前后指针变化

## 8. 练手题目

- [104. 二叉树的最大深度](/leetcode/104.maxDepth)
- [100. 相同的树](/leetcode/100.same-tree)
- [101. 对称二叉树](/leetcode/100.symmetric-tree)
- [226. 翻转二叉树](/leetcode/226) — 待补充
- [236. 二叉树的最近公共祖先](/leetcode/236) — 待补充
- [208. 实现 Trie（前缀树）](/leetcode/208.implement-trie-prefix-tree)

## 9. 小结

二叉树题目的通用解法是**先想递归**。前序位置做"进入"操作，后序位置做"退出"操作。掌握四种遍历、两种构造、三个经典问题（最大深度、翻转、LCA）能覆盖 80% 的题。
