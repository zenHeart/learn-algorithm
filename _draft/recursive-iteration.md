# 递归和迭代的转换

## 公式

**递归模式**

```math
f(n) = \begin{cases}
  1 &\text n = 1 \\
  1 &\text n = 2 \\
  f(n-1) + f(n-2) & \text n > 2
\end{cases}
```

**循环模式**

```math
f(n) = \begin {cases}
k1 = 1 &\text n =1 \\
k2 = 1 &\text n= 2 \\
k  &\text  n > 2 \\


\end {cases}
```