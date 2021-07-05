# LRU



## 概述
LRU 最近最少使用(least recently used) 淘汰算法。


## 算法步骤
1. 存数据
   1. 空间足够直接存储
   2. 空间不足替换最早未被访问的数据
2. 读数据
   1. 跟新读取对应的键到最高优先级



## 延伸
* leetcode 试题参见 [146.lru cache](https://leetcode-cn.com/problems/lru-cache/)