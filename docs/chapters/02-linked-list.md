---
title: 链表
order: 2
tags: [链表, 哨兵, 反转, 快慢指针]
difficulty: 入门
---

# 链表

链表是算法题的第二大基础结构。它通过指针把零散的节点串起来，避免了数组的搬迁成本，但也牺牲了随机访问。

## 1. 链表结构

### 1.1 单链表

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val
    this.next = next
  }
}
```

### 1.2 双向链表

```javascript
class DoublyListNode {
  constructor(val = 0, prev = null, next = null) {
    this.val = val
    this.prev = prev
    this.next = next
  }
}
```

### 1.3 数组 vs 链表

| 操作 | 数组 | 链表 |
|------|------|------|
| 按下标访问 | O(1) | O(n) |
| 头部增删 | O(n) | O(1) |
| 尾部增删 | O(1) | O(n) 无尾指针 / O(1) 有尾指针 |
| 中间增删 | O(n) | O(1) 已知前驱 |
| 内存占用 | 紧凑 | 额外指针（双向 ×2） |

## 2. 哨兵节点（Dummy Head）

链表的特殊位置处理（头节点变化、空链表）最容易出 bug。引入**哨兵节点**可以把头节点也变成普通节点处理：

```javascript
function removeElements(head, val) {
  const dummy = new ListNode(0)
  dummy.next = head
  let cur = dummy
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next
    else cur = cur.next
  }
  return dummy.next
}
```

哨兵节点不存数据、永远不删除，统一了"删除头节点"的边界条件。

## 3. 经典操作

### 3.1 反转链表

迭代版是面试必背：

```javascript
function reverseList(head) {
  let prev = null, cur = head
  while (cur) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }
  return prev
}
```

递归版更优雅但栈深度 O(n)：

```javascript
function reverseList(head) {
  if (!head || !head.next) return head
  const newHead = reverseList(head.next)
  head.next.next = head
  head.next = null
  return newHead
}
```

### 3.2 链表中点（快慢指针）

```javascript
function middleNode(head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
}
```

### 3.3 判环（Floyd 龟兔赛跑）

```javascript
function hasCycle(head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}
```

如果还需要找**环入口**，可在相遇后让一个指针回到 head，两指针同步走，再次相遇即为入口。

### 3.4 合并两个有序链表

```javascript
function mergeTwoLists(a, b) {
  const dummy = new ListNode(0)
  let cur = dummy
  while (a && b) {
    if (a.val <= b.val) { cur.next = a; a = a.next }
    else { cur.next = b; b = b.next }
    cur = cur.next
  }
  cur.next = a || b
  return dummy.next
}
```

## 4. 双向链表：LRU 缓存

LRU（Least Recently Used）淘汰是双向链表的招牌应用：

- **哈希表** O(1) 定位节点
- **双向链表** O(1) 把节点移到头部 / 删除尾部
- 哨兵 `head / tail` 消除空判

```javascript
class LRUCache {
  constructor(capacity) {
    this.cap = capacity
    this.map = new Map()
    this.head = new DoublyListNode(0)
    this.tail = new DoublyListNode(0)
    this.head.next = this.tail
    this.tail.prev = this.head
  }
  get(key) {
    if (!this.map.has(key)) return -1
    const node = this.map.get(key)
    this._moveToHead(node)
    return node.val
  }
  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key)
      node.val = value
      this._moveToHead(node)
    } else {
      if (this.map.size >= this.cap) {
        const last = this.tail.prev
        this.map.delete(last.key)
        this._removeNode(last)
      }
      const node = new DoublyListNode(value)
      node.key = key
      this.map.set(key, node)
      this._addToHead(node)
    }
  }
  _removeNode(n) {
    n.prev.next = n.next
    n.next.prev = n.prev
  }
  _addToHead(n) {
    n.next = this.head.next
    n.prev = this.head
    this.head.next.prev = n
    this.head.next = n
  }
  _moveToHead(n) {
    this._removeNode(n)
    this._addToHead(n)
  }
}
```

完整实现参见 [146. LRU 缓存](/leetcode/146.lru-cache)。

## 5. 可视化建议

链表可视化应展示：

- 节点圆形/矩形，箭头表示 `next` 指针
- 哨兵节点用虚线轮廓区分
- 反转/插入/删除用动画分步展示指针变化

## 6. 常见陷阱

- **丢失头节点引用**：删除头节点前必须先存 `next`
- **循环引用**：递归反转忘记把 `head.next = null`，会形成环
- **环形链表误判**：必须用快慢指针，不能用哈希表（虽然也能 AC，但不优雅）
- **多指针解链顺序**：删除节点时先存 `prev / next`，再改指针

## 7. 练手题目

- [21. 合并两个有序链表](/leetcode/21.merge-two-sorted-lists)
- [83. 删除排序链表中的重复元素](/leetcode/83.remove-duplicates-from-sorted-list)
- [160. 相交链表](/leetcode/160.intersection-of-two-linked-lists)
- [206. 反转链表](/leetcode/206) — 待补充
- [146. LRU 缓存](/leetcode/146.lru-cache)

## 8. 小结

链表题的核心是**指针操作的可读性**。画图 + 哨兵 + 虚拟头三点齐备，能解决 90% 的链表题。
