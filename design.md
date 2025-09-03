### 1. 核心架构与通用工作流

整个系统基于 **`iframe` 沙箱**、**`esbuild-wasm` 转译器** 和 **`postMessage` 通信**。所有模板都遵循相同的通用流程：

1. **文件解析与转译**：根据 `playground` 配置，加载文件。**`esbuild-wasm`** 将所有非标准格式（如 `.ts`, `.tsx`, `.vue`）转译成 ES Modules (`.js` 和 `.css`)。
2. **虚拟文件系统**：转译器在内存中构建一个虚拟文件系统，处理 `import` 路径。
3. **构建沙箱 HTML**：根据模板类型，动态生成一个 `<iframe srcdoc="...">`，其中包含所有转译后的代码和必需的库（如 React、Vue）。
4. **运行时通信**：`iframe` 中的代码通过 `postMessage` 将控制台输出、错误和测试结果发送回主页面，实现实时反馈。

-----

### 2. 模板使用案例与具体实现

下面，我们将通过具体的代码示例，演示每种模板的使用方式和内部实现细节。

#### 案例一：HTML 模板

这是最基础的模板，**不进行任何转译**。用户完全控制 `iframe` 中的内容。

**文件结构**：

```
demo/
├── index.html
└── styles.css
```

**`playground` 配置**：

```playground
file: ./demo/index.html
template: html
title: "HTML Demo"
```

**`index.html` 内容**：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a simple HTML playground.</p>
</body>
</html>
```

**实现细节**：

- 系统直接读取 `index.html` 的内容，并将其赋值给 `iframe` 的 `srcdoc`。
- 如果 `index.html` 引用了其他文件（如 `styles.css`），系统会预先将这些文件内容通过 `<style>` 或 `<script>` 标签注入到 `srcdoc` 中。

-----

#### 案例二：JavaScript (ESM) 模板

该模板将纯 JS/TS 文件作为 ES Modules 运行，支持 `import/export` 语法。

**文件结构**：

```
demo/
├── main.js
└── utils.js
```

**`playground` 配置**：

```playground
dir: ./demo/
template: js-esm
entry: main.js
title: "JS ESM Demo"
```

**`main.js` 内容**：

```js
import { sum } from './utils.js';

console.log('2 + 3 =', sum(2, 3));
```

**`utils.js` 内容**：

```js
export function sum(a, b) {
  return a + b;
}
```

**实现细节**：

- **转译**：如果文件是 `.ts`，`esbuild` 会将其转译为 `.js`。
- **构建 `srcdoc`**：系统创建一个基本的 `srcdoc`，然后将转译后的 `main.js` 和 `utils.js` 内容分别注入到 `<script type="module">` 标签中。
- **运行时**: 浏览器自动解析 `main.js` 中的 `import` 语句，并加载 `utils.js`，最终执行代码并输出结果到控制台。

-----

#### 案例三：React + TypeScript 模板

该模板支持 React 组件和 TypeScript 语法。

**文件结构**：

```
demo/
├── App.tsx
└── index.tsx
```

**`playground` 配置**：

```playground
dir: ./demo/
template: react-ts
entry: index.tsx
title: "React & TypeScript"
```

**`App.tsx` 内容**：

```tsx
import React from 'react';

export default function App() {
  return <h1>Hello, React with TypeScript!</h1>;
}
```

**`index.tsx` 内容**：

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
```

**实现细节**：

- **转译**：`esbuild` 将 `App.tsx` 和 `index.tsx` 中的 JSX 和 TypeScript 语法转译为纯 JS。
- **构建 `srcdoc`**：
    1. 注入 React 和 ReactDOM 的 CDN 脚本。
    2. 注入一个根 DOM 元素 `<div id="root"></div>`。
    3. 注入转译后的 `App.tsx` 和 `index.tsx` 代码，并执行 `index.tsx` 中的渲染逻辑。

-----

#### 案例四：测试模板

该模板用于运行单元测试，无需渲染任何 UI。

**文件结构**：

```
demo/
├── quicksort.js
└── quicksort.test.js
```

**`playground` 配置**：

```playground
dir: ./demo/
template: test
entry: quicksort.test.js
title: "Unit Tests"
```

**`quicksort.test.js` 内容**：

```js
import { quicksort } from './quicksort.js';
import { expect } from 'chai';

describe('quicksort', () => {
  it('should sort an array of numbers', () => {
    const arr = [5, 3, 8, 4, 2];
    expect(quicksort(arr)).to.deep.equal([2, 3, 4, 5, 8]);
  });
});
```

**`quicksort.js` 内容**：

```js
export function quicksort(arr) {
  // ... implementation
}
```

**实现细节**：

- **转译**：`esbuild` 将所有文件转译为 ES Modules。
- **构建 `srcdoc`**：
    1. 注入 Mocha 和 Chai 的 CDN 脚本。
    2. 注入一个用于显示测试结果的 DOM 元素。
    3. 注入转译后的 `quicksort.js` 和 `quicksort.test.js`。
    4. 注入一段启动脚本，调用 `mocha.run()` 并监听测试结果，然后将结果通过 `postMessage` 发送给父页面。
- **运行时**: 父页面收到测试结果后，渲染出类似于您图片中所示的测试报告 UI。

这个方案将语法规范与具体的实现细节相结合，为不同类型的 `playground` 提供了清晰且可操作的工作流。
