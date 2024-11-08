# [比特位计算](https://leetcode-cn.com/problems/counting-bits/)

## 题解
1. 按照简单的执行顺序处理即可

```math
S_{n} = \begin {cases}
[ 0 ] & \text n = 0 \\
S_{n-1} + count(n) & \text n > 1 \\
\end {cases}

Sn = 
```