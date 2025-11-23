# LeetCode 测试命令使用说明

## 功能概述

本项目提供了灵活的 LeetCode 辅助命令，支持：

1. **自动生成题目模版**：根据 LeetCode 题目链接自动生成包含 README、代码模版和测试用例的目录。
2. **按题目编号运行测试**：支持按题目编号运行特定的测试用例。

## 可用命令

### 1. 生成题目模版

```bash
pnpm lc <leetcode-url>
```

**示例**：

```bash
pnpm lc https://leetcode.cn/problems/rectangle-area/description/
```

该命令会自动在 `docs/leetcode/` 目录下生成 `<id>.<slug>` 目录，包含：

- `README.md`: 题目描述、标签和解题思路占位符。
- `index.js`: 代码实现模版。
- `index.test.js`: 包含示例测试用例的测试文件。

### 2. 运行指定编号的题目测试

```bash
# 使用短命令名（推荐）
pnpm test:l <编号>
```

**示例**：

```bash
# 运行第 1 题（Two Sum）
pnpm test:l 1

# 运行第 322 题（Coin Change）
pnpm test:l 322
```

### 3. 运行所有 LeetCode 测试

```bash
pnpm test:leetcode
```

## 测试匹配规则

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
