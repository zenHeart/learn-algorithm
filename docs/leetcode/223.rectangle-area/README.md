---
tags:
  - 几何
  - 数学
---

# [矩形面积](https://leetcode.cn/problems/rectangle-area/description/)

## 题目描述

<p>给你 <strong>二维</strong> 平面上两个 <strong>由直线构成且边与坐标轴平行/垂直</strong> 的矩形，请你计算并返回两个矩形覆盖的总面积。</p>

<p>每个矩形由其 <strong>左下</strong> 顶点和 <strong>右上</strong> 顶点坐标表示：</p>

<div class="MachineTrans-Lines">
<ul>
	<li class="MachineTrans-lang-zh-CN">第一个矩形由其左下顶点 <code>(ax1, ay1)</code> 和右上顶点 <code>(ax2, ay2)</code> 定义。</li>
	<li class="MachineTrans-lang-zh-CN">第二个矩形由其左下顶点 <code>(bx1, by1)</code> 和右上顶点 <code>(bx2, by2)</code> 定义。</li>
</ul>
</div>

<p>&nbsp;</p>

<p><strong>示例 1：</strong></p>
<img alt="Rectangle Area" src="https://assets.leetcode.com/uploads/2021/05/08/rectangle-plane.png" style="width: 700px; height: 365px;" />
<pre>
<strong>输入：</strong>ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
<strong>输出：</strong>45
</pre>

<p><strong>示例 2：</strong></p>

<pre>
<strong>输入：</strong>ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
<strong>输出：</strong>16
</pre>

<p>&nbsp;</p>

<p><strong>提示：</strong></p>

<ul>
	<li><code>-10<sup>4</sup> &lt;= ax1 &lt;= ax2 &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= ay1 &lt;= ay2 &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= bx1 &lt;= bx2 &lt;= 10<sup>4</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= by1 &lt;= by2 &lt;= 10<sup>4</sup></code></li>
</ul>

## 解题思路

1. 重点`总面积 = 矩形 1 面积 + 矩形 2 面积 - 重叠面积`
2. 重叠面积计算是难点，这里的核心思路是把重叠矩形的确认转换为 x/y 坐标轴投影，计算交叉的确认
   1. 重叠矩形面积的长和宽，本质是两个矩形在 x 轴 和 y 轴重叠的坐标交叉
   2. x 轴交叉范围是
      1. 左顶点点为 Max(矩形 1 左下顶点，矩形 2 左下顶点)
      2. 右顶点点为 Min(矩形 1 右下顶点，矩形 2 右下顶点)
      3. 右顶点 > 左顶点 才存在 x 投影重叠
   3. y 轴交叉范围
      1. 下顶点，Max(矩形1左下顶点，矩形2左下顶点)
      1. 上顶点，Min(矩形1左上顶点，矩形2左上下顶点)
      1. 上顶点 > 下顶点 才存在 y 投影重叠
   4. 同时满足 2 3 才存在重叠，重叠面积为 2 ，3 的差的乘积
