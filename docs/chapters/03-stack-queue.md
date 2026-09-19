---
title: 栈与队列
order: 3
tags: [栈, 队列, 单调栈, 优先级队列]
difficulty: 入门
---

# 栈与队列

栈和队列是受限制的线性表——访问位置受限换来的是**语义清晰**与**实现简单**。它们是 DFS / BFS、表达式求值、单调序列等算法的底层引擎。

## 1. 栈（Stack）

后进先出（LIFO），只允许在栈顶做 push / pop / peek。

```javascript
class Stack {
  constructor() { this.items = [] }
  push(x) { this.items.push(x) }
  pop() { return this.items.pop() }
  peek() { return this.items[this.items.length - 1] }
  isEmpty() { return this.items.length === 0 }
  get size() { return this.items.length }
}
```

### 1.1 经典应用

**括号匹配**：左括号压栈，右括号弹栈检查匹配。

```javascript
function isValid(s) {
  const map = { ')': '(', ']': '[', '}': '{' }
  const stack = []
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch)
    else if (stack.pop() !== map[ch]) return false
  }
  return stack.length === 0
}
```

**表达式求值**：用两个栈（操作数栈、运算符栈）实现中缀到后缀的转换与求值。Shunting-yard 算法是经典实现。

**函数调用栈**：所有递归都依赖系统栈；当递归深度过大（如树深度 ≥ 10⁵）需要改写为显式栈迭代。

### 1.2 单调栈

单调栈是**栈内元素保持单调性**的特殊栈，用于"下一个更大元素""接雨水"等场景：

```javascript
// 739. 每日温度
function dailyTemperatures(temps) {
  const stack = []  // 存下标，保持栈内下标对应温度递增
  const res = new Array(temps.length).fill(0)
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const j = stack.pop()
      res[j] = i - j
    }
    stack.push(i)
  }
  return res
}
```

单调栈把"找下一个更大"从 O(n²) 降到 O(n)，因为每个元素只入栈出栈各一次。

## 2. 队列（Queue）

先进先出（FIFO），只允许在队尾入队、队首出队。

```javascript
class Queue {
  constructor() { this.items = [] }
  enqueue(x) { this.items.push(x) }
  dequeue() { return this.items.shift() }  // O(n)，可改用 head 指针
  front() { return this.items[0] }
  isEmpty() { return this.items.length === 0 }
  get size() { return this.items.length }
}
```

JS 数组 `shift()` 是 O(n)，生产代码建议用**双指针队列**或**循环数组**。

### 2.1 双端队列（Deque）

两侧都能入队/出队，是**滑动窗口最大值**等问题的关键。

```javascript
// 239. 滑动窗口最大值
function maxSlidingWindow(nums, k) {
  const deque = []  // 存下标，对应值单调递减
  const res = []
  for (let i = 0; i < nums.length; i++) {
    // 移除超出窗口的队首
    if (deque.length && deque[0] < i - k + 1) deque.shift()
    // 维护单调递减
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop()
    deque.push(i)
    if (i >= k - 1) res.push(nums[deque[0]])
  }
  return res
}
```

### 2.2 优先级队列（堆）

优先级队列**不按入队顺序出队**，而是按"优先级"（最小/最大）出队。底层一般是**二叉堆**：

- 入队 O(log n)
- 出队（取最值）O(log n)
- 查看最值 O(1)

JS 无内置堆，但 100 行可手写一个：

```javascript
class MinHeap {
  constructor() { this.data = [] }
  size() { return this.data.length }
  peek() { return this.data[0] }
  push(x) {
    this.data.push(x)
    let i = this.data.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (this.data[p] <= this.data[i]) break
      ;[this.data[p], this.data[i]] = [this.data[i], this.data[p]]
      i = p
    }
  }
  pop() {
    if (this.data.length === 0) return undefined
    const top = this.data[0]
    const last = this.data.pop()
    if (this.data.length) {
      this.data[0] = last
      let i = 0
      while (true) {
        const l = 2 * i + 1, r = 2 * i + 2
        let smallest = i
        if (l < this.data.length && this.data[l] < this.data[smallest]) smallest = l
        if (r < this.data.length && this.data[r] < this.data[smallest]) smallest = r
        if (smallest === i) break
        ;[this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]]
        i = smallest
      }
    }
    return top
  }
}
```

堆在 Dijkstra、Top K、合并 K 个有序链表等问题中都是关键工具。

## 3. 复杂度总结

| 数据结构 | push | pop/取最值 | 随机访问 | 备注 |
|----------|------|------------|----------|------|
| Stack (数组) | O(1) 摊销 | O(1) | O(1) | |
| Queue (数组) | O(1) 摊销 | O(n) | O(1) | 用 head 指针改 O(1) |
| Deque (数组) | O(1) 摊销 | O(1) | O(1) | |
| Min/Max Heap | O(log n) | O(log n) | — | |

## 4. 可视化建议

- **栈**：垂直条状，push 顶上加、pop 顶上去除
- **队列**：横向条状，enqueue 右加、dequeue 左去
- **单调栈**：用颜色区分"弹出"和"保留"节点
- **滑动窗口最大值**：在双端队列上用方块标注"窗口下标"

## 5. 练手题目

- [20. 有效的括号](/leetcode/20.valid-parentheses)
- [155. 最小栈](/leetcode/155.min-stack)
- [239. 滑动窗口最大值](/leetcode/239) — 待补充
- [739. 每日温度](/leetcode/739) — 待补充
- [155.min-stack 实现](docs/data-structures/03.stack/parenthesesMatch.test.ts)

## 6. 小结

栈/队列是受限但语义极强的工具。看到"匹配 / 配对 / 嵌套"想到栈，看到"层次 / 顺序 / 流"想到队列。单调栈/队列是进阶工具，值得花时间专门训练。
