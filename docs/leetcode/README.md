# LeetCode 测试命令使用说明

## 功能概述

本项目提供了灵活的 LeetCode 测试命令，支持按题目编号运行特定的测试用例。

## 可用命令

### 1. 运行所有 LeetCode 测试

```bash
pnpm test:leetcode
```

### 2. 运行指定编号的题目测试

```bash
# 使用完整命令名
pnpm test:leetcode:run <编号>

# 使用短命令名（推荐）
pnpm test:l <编号>
```

## 使用示例

### 运行单个题目

```bash
# 运行第 1 题（Two Sum）
pnpm test:l 1

# 运行第 20 题（Valid Parentheses）
pnpm test:l 20

# 运行第 322 题（Coin Change）
pnpm test:l 322
```

### 运行多个相同编号的题目

```bash
# 运行所有第 100 题（Same Tree 和 Symmetric Tree）
pnpm test:l 100
```

### 查看可用题目

```bash
# 运行不存在的编号会显示所有可用题目
pnpm test:l 999
```

## 匹配规则

脚本支持以下匹配模式：

1. **完全匹配**: `332` → `332.xxx`
2. **前缀匹配**: `1` → `1.two-sum`, `10.roman-to-integer`
3. **部分匹配**: `20` → `20.valid-parentheses`, `200.number-of-islands`

## 输出说明

- 🔍 显示找到的匹配题目
- 📁 列出匹配的目录
- 🚀 显示实际执行的测试命令
- ✅ 测试通过 / ❌ 测试失败

## 错误处理

- 如果编号不存在，会显示所有可用的题目编号
- 如果测试执行失败，会显示错误信息并退出

## 技术实现

- 使用 Node.js 脚本动态查找匹配的目录
- 支持 ESM 模块语法
- 集成 vitest 测试框架
- 自动过滤非数字开头的目录
