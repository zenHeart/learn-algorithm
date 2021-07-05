# [杨辉三角](https://leetcode-cn.com/problems/pascals-triangle/)

## 题解
1. 按照简单的执行顺序处理即可

```math
Max(s_n) = \begin{cases}
  Max(s_{n-1}) &\text{ if } n> 2 \\
  0 & \text { if } n = 1
\end{cases}
```