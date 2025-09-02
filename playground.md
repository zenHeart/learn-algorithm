# Playground 语法规范

## 1. 基本语法

### 1.1 单文件模式

```playground
file: ./demo/hello.js
template: react
```

- **`file`**: 引用单个文件。
- **`template`**: 可选，系统会根据文件后缀（如 `.ts` → `ts-react`）或默认规则自动推断。

### 1.2 文件夹模式

```playground
dir: ./demo/
template: react
entry: App.jsx
```

- **`dir`**: 表示注入整个文件夹。
- **`entry`**: 可选，指定入口文件。若省略，系统将根据 `template` 规则自动推断。

## 2. 高级模式（多文件）

### 2.1 显式多文件模式

```playground
files:
  - ./demo/App.jsx
  - ./demo/index.css
  - ./demo/utils.js
template: react
entry: App.jsx
```

- **`files`**: 显式列出所有要注入的文件。
- **`entry`**: 必须在 `files` 列表中。

### 2.2 文件配置（无映射）

在多文件模式下，可使用 **`files`** 列表中的对象语法来配置单个文件。

```playground
dir: ./demo/
template: react
entry: App.jsx
files:
  - './App.jsx'
  - './components/Button.jsx':
      hidden: true
  - './index.css':
      active: true
```

- **文件配置对象**: 键为文件路径，值为配置对象。
  - **`hidden`**: `boolean`，是否在文件列表中隐藏该文件（默认 `false`）。
  - **`active`**: `boolean`，是否默认激活该文件选项卡（默认 `false`）。
- **注意**: `files` 列表中的文件将按顺序排列，并且其原始文件名将被保留。

## 3. 全局配置与选项

```playground
file: ./demo/hello.ts
template: ts-react
title: "Hello Playground"
options:
  runOnLoad: true
  editable: true
  sandbox: true
```

- **`title`**: 可选，用于 UI 展示的标题。
- **`options`**: 控制 Playground 行为的额外配置。
  - **`runOnLoad`**: `boolean`，是否自动运行（默认 `false`）。
  - **`editable`**: `boolean`，是否允许用户修改代码（默认 `true`）。
  - **`sandbox`**: `boolean`，是否隔离运行环境（默认 `true`）。

## 4. 文件路径与索引规则

1.  **搜索起点**: 所有相对路径（`./`、`../`）都从 **当前 Markdown 文件所在目录** 开始解析。
2.  **路径类型**: 仅支持相对路径，不支持绝对路径或远程 URL，以保证可移植性和安全性。
3.  **文件夹模式**: 系统会自动递归扫描目录，并忽略 `.gitignore` 规则中的隐藏目录（`.git`, `.cache`）和常见依赖目录（`node_modules`, `dist`, `build`）。

## 5. `<Playground/>` 组件模式

所有语法规则都可以作为组件的 props 使用。

```jsx
import { Playground } from '@ui-library'

function MyDemo() {
  return (
    <Playground
      dir='./demo/'
      template='react'
      entry='App.jsx'
      files={['./App.jsx', { './styles.css': { hidden: true } }]}
      options={{ runOnLoad: true }}
    />
  )
}
```
