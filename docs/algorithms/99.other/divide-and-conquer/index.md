# 分治法 

## 算法概述
参考 MIT 教材说明 [divide and conquer](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-design-and-analysis-of-algorithms-spring-2015/lecture-notes/MIT6_046JS15_lec02.pdf) 分治法的定义如下

> T(n) = aT(n/b) + [work for merge]

1. `T(n)` 表示实际需要求解的问题
2. `a` 为子问题的个数
3. `T(n/b)` 为子问题，其中 `b > 1` 说明，子问题规模必须比实际问题 `T(n)` 小
4. `work for merge` 说明将拆解后的子问题答案合并需要做的工作

用更直白的话讲，分治法是**将需要解决的问题拆分为更简单的子问题，并合并子问题的结果，为实际问题答案的一种算法策略。**

使用分治法的重点为 
1. **如何拆分子问题**
2. **如何合并子问题的结果得到实际解答**


## 知识点
1. 分治法的公式 `T(n) = aT(n/b) + [merge of work]`
   1. 解决子问题的拆分
   2. 解决子结果的合并
2. 典型问题，参见 [wiki](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm)
   1. 快排和归并排序
   2. 