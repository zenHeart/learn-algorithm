---
tags:
  - 数组
  - 哈希表
  - 字符串
  - 排序
---

# [字母异位词分组](https://leetcode.cn/problems/group-anagrams/description)

## 题目描述

<p>给你一个字符串数组，请你将 <span data-keyword="anagram">字母异位词</span> 组合在一起。可以按任意顺序返回结果列表。</p>

<p>&nbsp;</p>

<p><strong>示例 1:</strong></p>

<div class="example-block">
<p><strong>输入:</strong> strs = ["eat", "tea", "tan", "ate", "nat", "bat"]</p>

<p><strong>输出: </strong>[["bat"],["nat","tan"],["ate","eat","tea"]]</p>

<p><strong>解释：</strong></p>

<ul>
	<li>在 strs 中没有字符串可以通过重新排列来形成 <code>"bat"</code>。</li>
	<li>字符串 <code>"nat"</code> 和 <code>"tan"</code> 是字母异位词，因为它们可以重新排列以形成彼此。</li>
	<li>字符串 <code>"ate"</code>&nbsp;，<code>"eat"</code>&nbsp;和 <code>"tea"</code> 是字母异位词，因为它们可以重新排列以形成彼此。</li>
</ul>
</div>

<p><strong>示例 2:</strong></p>

<div class="example-block">
<p><strong>输入:</strong> strs = [""]</p>

<p><strong>输出: </strong>[[""]]</p>
</div>

<p><strong>示例 3:</strong></p>

<div class="example-block">
<p><strong>输入:</strong> strs = ["a"]</p>

<p><strong>输出: </strong>[["a"]]</p>
</div>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>1 &lt;= strs.length &lt;= 10<sup>4</sup></code></li>
	<li><code>0 &lt;= strs[i].length &lt;= 100</code></li>
	<li><code>strs[i]</code>&nbsp;仅包含小写字母</li>
</ul>

## 解题思路

1. 字母异位词是指相同字母，但是排序不一样组成的词组
2. 暴力解法，先存成 map 每读入一个单词
   1. 先把单词字母排序
   2. 排序后的单词字母作为 key
   3. 如果当前 key 对应的单词为空或者不存在排序前的单词就推入这个词组
   4. 输出 map 的 key 对应的 二维数组
3. 优化逻辑
   1. 排序复杂度是 nlogn 但是这里字符串有相同的字母，本质是每个字母出现次数一样, 这样可以把 key 换成每个字母出现次数的记录，这样复杂度降低到 n

<!-- TODO: Add solution explanation -->
