---
title: 图
order: 6
tags: [图, DFS, BFS, 拓扑排序, 并查集]
difficulty: 中等
---

# 图

图是表达**多对多关系**的最一般结构。社交网络、地图导航、任务依赖、状态转移都可以建模为图。本章梳理图的存储、遍历和典型算法。

## 1. 图的术语

- **顶点（vertex）**：图中的节点
- **边（edge）**：连接两个顶点的关系
- **有向图 / 无向图**：边是否有方向
- **加权图**：边上带权值（距离、代价）
- **度（degree）**：与该顶点相连的边数
- **连通分量**：互相可达的子图

## 2. 图的存储

### 2.1 邻接矩阵

`n × n` 矩阵 `A`，`A[i][j] = 1` 表示有边。空间 O(n²)，适合**稠密图**。

```javascript
// 邻接矩阵
const matrix = Array.from({ length: n }, () => new Array(n).fill(0))
matrix[u][v] = 1
```

### 2.2 邻接表

每个顶点维护一个邻居列表。空间 O(n + m)，适合**稀疏图**。

```javascript
// 邻接表
const adj = Array.from({ length: n }, () => [])
adj[u].push(v)
```

### 2.3 边列表

所有边存为 `(u, v, w)` 元组列表。Kruskal 最小生成树用它。

```javascript
const edges = [[0, 1, 5], [1, 2, 3]]
```

## 3. 图的遍历

### 3.1 DFS

```javascript
function dfs(adj, start, visited = new Set()) {
  visited.add(start)
  console.log(start)
  for (const next of adj[start]) {
    if (!visited.has(next)) dfs(adj, next, visited)
  }
}

// 迭代版（显式栈）
function dfsIter(adj, start) {
  const visited = new Set()
  const stack = [start]
  while (stack.length) {
    const node = stack.pop()
    if (visited.has(node)) continue
    visited.add(node)
    console.log(node)
    for (const next of adj[node]) {
      if (!visited.has(next)) stack.push(next)
    }
  }
}
```

时间 O(n + m)，空间 O(n)。

### 3.2 BFS

```javascript
function bfs(adj, start) {
  const visited = new Set([start])
  const queue = [start]
  while (queue.length) {
    const node = queue.shift()
    console.log(node)
    for (const next of adj[node]) {
      if (!visited.has(next)) {
        visited.add(next)
        queue.push(next)
      }
    }
  }
}
```

BFS 求**无权图最短路径**：

```javascript
function shortestPath(adj, start, end) {
  const visited = new Set([start])
  const queue = [[start, 0]]
  while (queue.length) {
    const [node, dist] = queue.shift()
    if (node === end) return dist
    for (const next of adj[node]) {
      if (!visited.has(next)) {
        visited.add(next)
        queue.push([next, dist + 1])
      }
    }
  }
  return -1
}
```

## 4. 拓扑排序

拓扑排序针对**有向无环图（DAG）**，把节点排成线性序列使得每条边 `u → v` 中 u 在 v 前面。

### 4.1 Kahn 算法（BFS 风格）

```javascript
function topoSort(n, adj) {
  const indeg = new Array(n).fill(0)
  for (let u = 0; u < n; u++)
    for (const v of adj[u]) indeg[v]++

  const queue = []
  for (let i = 0; i < n; i++) if (indeg[i] === 0) queue.push(i)

  const order = []
  while (queue.length) {
    const u = queue.shift()
    order.push(u)
    for (const v of adj[u]) {
      if (--indeg[v] === 0) queue.push(v)
    }
  }
  return order.length === n ? order : []  // 空数组 = 有环
}
```

时间 O(n + m)，空间 O(n)。

### 4.2 DFS 拓扑

```javascript
function topoDFS(n, adj) {
  const visited = new Set()
  const onStack = new Set()
  const order = []
  let hasCycle = false

  function dfs(u) {
    if (hasCycle) return
    if (onStack.has(u)) { hasCycle = true; return }
    if (visited.has(u)) return
    visited.add(u)
    onStack.add(u)
    for (const v of adj[u]) dfs(v)
    onStack.delete(u)
    order.unshift(u)  // 后续入 order 前部
  }

  for (let i = 0; i < n; i++) dfs(i)
  return hasCycle ? [] : order
}
```

## 5. 并查集（Union-Find）

并查集是处理**不相交集合合并与查询**的高效结构：

```javascript
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = new Array(n).fill(0)
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x])  // 路径压缩
    return this.parent[x]
  }
  union(x, y) {
    const rx = this.find(x), ry = this.find(y)
    if (rx === ry) return false
    if (this.rank[rx] < this.rank[ry]) this.parent[rx] = ry
    else if (this.rank[rx] > this.rank[ry]) this.parent[ry] = rx
    else { this.parent[ry] = rx; this.rank[rx]++ }
    return true
  }
  connected(x, y) { return this.find(x) === this.find(y) }
}
```

- **路径压缩** + **按秩合并**：单次操作均摊 O(α(n))（α 是反阿克曼函数）
- 典型应用：连通分量、Kruskal 最小生成树、岛屿数量、最近公共祖先（离线 Tarjan）

## 6. 最短路径

### 6.1 Dijkstra（单源正权图）

```javascript
function dijkstra(n, adj, src) {
  const dist = new Array(n).fill(Infinity)
  dist[src] = 0
  const pq = [[0, src]]  // 简易最小堆
  const visited = new Set()
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0])
    const [d, u] = pq.shift()
    if (visited.has(u)) continue
    visited.add(u)
    for (const [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w
        pq.push([dist[v], v])
      }
    }
  }
  return dist
}
```

时间 O((n + m) log n)。**不能处理负权边**。

### 6.2 Bellman-Ford（可负权）

```javascript
function bellmanFord(n, edges, src) {
  const dist = new Array(n).fill(Infinity)
  dist[src] = 0
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w
    }
  }
  // 负环检测
  for (const [u, v, w] of edges) {
    if (dist[u] + w < dist[v]) return null  // 有负环
  }
  return dist
}
```

时间 O(nm)，比 Dijkstra 慢但能处理负权并检测负环。

## 7. 最小生成树

### 7.1 Kruskal

按权重升序遍历边，用并查集判断是否成环：

```javascript
function kruskal(n, edges) {
  edges.sort((a, b) => a[2] - b[2])
  const uf = new UnionFind(n)
  const mst = []
  for (const [u, v, w] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, w])
      if (mst.length === n - 1) break
    }
  }
  return mst
}
```

时间 O(m log m)。适合稀疏图。

### 7.2 Prim

类似 Dijkstra，从一个点开始贪心扩展。适合稠密图 O(n²) 或堆优化 O(m log n)。

## 8. 复杂度

| 算法 | 时间 | 空间 | 适用 |
|------|------|------|------|
| DFS / BFS | O(n + m) | O(n) | 连通性、遍历 |
| Kahn 拓扑 | O(n + m) | O(n) | DAG 排序 |
| Dijkstra | O((n + m) log n) | O(n) | 单源正权最短路 |
| Bellman-Ford | O(nm) | O(n) | 单源含负权 |
| Kruskal | O(m log m) | O(n) | 稀疏图 MST |
| Prim | O(m log n) | O(n) | 稠密图 MST |
| Union-Find | O(α(n)) | O(n) | 集合合并/查询 |

## 9. 可视化建议

- **DFS / BFS**：用不同颜色标出"正在访问""已访问""未访问"三态
- **拓扑排序**：用动画展示入度归零、节点入队、出队的过程
- **Dijkstra**：在边上动态显示当前已知最短距离，颜色深浅代表 d 值大小
- **Kruskal**：逐条边高亮，已选边用实线、未选用虚线

## 10. 练手题目

- [200. 岛屿数量](/leetcode/200.number-of-islands)
- [207. 课程表](/leetcode/207.course-schedule)
- [210. 课程表 II](/leetcode/210.course-schedule-ii)
- [133. 克隆图](/leetcode/133.clone-graph)

## 11. 小结

图论题的关键是**建模**：把题目约束翻译成"哪些是顶点、哪些是边、边权是什么"。建模后，DFS / BFS / 拓扑 / Dijkstra 都是模板题。
