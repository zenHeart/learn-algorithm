# 回溯

## 知识点

1. 回溯是一种遍历穷举，相比普通穷举，回溯的重点是
   - 通过剪枝减少不必要的遍历
   - 通过状态空间树的方式进行组织和管理
2. 回溯问题的核心策略
   1. 识别初始状态
   2. 确定需要记录的中间状态，这里核心包括两个状态
      1. 当前已经选择过的路径 path
      2. 当前需要遍历的节点集合 choices
         1. 如果节点集合顺序无所谓，则直接全量便利，通过剪枝排除
   3. 确定成功的终止态
   4. 确定需要剪枝的状态
      1. 按照逻辑组合最少的方式来写，剪枝可以先排除，或者直接处理结果
         1. 如果解法为交集，则直接处理解法，剩余的自然被剪枝
         2. 如果解法为并集，则先处理剑指，剩下的分类讨论
3. 核心难点
   1. 状态的选择，典型例题
      1. 排列和组合，组合比排列在回溯是考虑了起始位置这个新的变量
   2. 回溯的策略
      1. [22.括号生成](https://leetcode.cn/problems/generate-parentheses/description/?envType=problem-list-v2&envId=backtracking) 难点在于回溯策略的确定
      2. [17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/?envType=problem-list-v2&envId=backtracking) 电话号码
