# 算法学习网站 - 简化需求文档

## 产品概述

### 产品定位

交互式算法与数据结构学习平台，采用配置化方案降低使用成本。

### 核心价值

- 📚 **配置化交互**: 通过注释和代码块配置替代复杂组件
- 🎨 **DSL 可视化**: 类似 mermaid 的数据结构可视化
- 🔧 **内容自动生成**: 基于文件结构的智能解析
- 💻 **现代技术栈**: React 19 + Vite 7 + TypeScript

## 目标和需求

### 基础需求

1. 将 docs 下内容编译为文档站点，目前内容包含

  ```
    docs
  ├── algorithms
  ├── data-structures
  ├── encode
  ├── leetcode
  └── math
  ```

2. 支持交互式的编辑，编辑器采用 codemirror, 运行 cjs 和 esm,
纯浏览器沙盒环境运行 deno ,采用 wasm 技术
3. 可视化交互显示 data-strutures/encode 等结构
4. 采用 mdx, 支持渲染数学公式
5. 核心技术栈
   1. 最新的 vite 7
   2. mdx 使用 @mdx-js/rollup@3
   3. 编辑器 codemirror@6
   4. 框架使用 react@19
   5. 路由使用 react-router@7

## 网站架构设计

### 1. 页面结构

```
├── / (主页)
├── /data-structures (数据结构)
├── /algorithms (算法)
├── /leetcode (题目练习)  
├── /math (数学基础)
├── /encode (编码原理)
└── /playground (在线验证)
```

### 2. 详情页布局

```
Header: 导航 | 搜索 | 主题切换
├── 左侧导航栏 (可收缩)
│   ├── 目录树 (自动生成)
│   └── 页面 TOC
└── 右侧内容区
    ├── MDX 渲染内容
    └── 上下页导航
```

## 代码开发规范

### 1. 组件架构设计

**组件拆分原则**:

- **就近原则**: 组件和相关文件放在同一目录
- **单一职责**: 每个组件只负责一个功能
- **函数精简**: 单个函数不超过 30 行代码
- **模块化**: 可复用逻辑提取为自定义 hooks

**组件目录结构**:

```
src/components/mdx/
├── playground/
│   ├── index.tsx           # 主入口组件
│   ├── CodeEditor.tsx      # 代码编辑器
│   ├── TestRunner.tsx      # 测试执行器
│   ├── OutputPanel.tsx     # 输出面板
│   └── types.ts           # 类型定义
├── data-structure/
│   ├── index.tsx          # 可视化入口
│   ├── BinaryTree.tsx     # 二叉树组件
│   ├── Graph.tsx          # 图结构组件
│   ├── Array.tsx          # 数组组件
│   └── hooks/             # 相关 hooks
│       ├── useAnimation.ts
│       └── useDataStructure.ts
└── encode/
    ├── index.tsx          # 编码可视化入口
    ├── UTF8Visualizer.tsx # UTF8 编码
    ├── HuffmanTree.tsx    # 霍夫曼编码
    └── utils/             # 工具函数
        └── encodingUtils.ts
```

### 2. 样式规范

**使用 Tailwind CSS**:

- 基础样式使用 Tailwind 类名
- 复杂定制使用内联样式便于管理
- 响应式设计优先

```typescript
// ✅ 推荐：Tailwind + 内联定制
<div 
  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 transition-colors"
  style={{ 
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(8px)'
  }}
>
  <CodeEditor />
</div>

// ❌ 避免：单独的 CSS 文件
```

**主题支持**:

```typescript
// 使用 CSS 变量 + Tailwind
:root {
  --color-primary: #3b82f6;
  --color-bg-code: #f8fafc;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --color-bg-code: #1e293b;
}

// 组件中使用
<div className="bg-[var(--color-bg-code)] text-[var(--color-primary)]">
```

### 3. 配置化系统

**YAML Meta 配置**:

```markdown
---
title: "快速排序算法"
difficulty: "中等"
tags: ["排序", "分治", "递归"]
visualization: true
playground: 
  - id: "quick-sort-demo"
    template: "demo"
  - id: "quick-sort-exercise" 
    template: "exercise"
related: ["merge-sort", "heap-sort"]
---

# 快速排序算法

## 算法原理

快速排序是一种高效的排序算法...

{/* @playground id="quick-sort-demo" template="demo" */}
```

**配置字段说明**:

- `title`: 页面标题
- `difficulty`: 难度等级 (简单/中等/困难)
- `tags`: 标签数组
- `visualization`: 是否启用可视化
- `playground`: 代码示例配置
- `related`: 相关主题

## 简化的 MDX 配置方案

### 1. 在线代码编辑

**使用方式**: 通过注释配置，降低使用成本

```markdown
{/* @playground id="quick-sort" template="demo" */}

{/* @playground id="binary-tree" template="exercise" */}  

{/* @playground id="hash-map" template="test" */}

{/* @playground id="binary-tree-viz" template="data-structure" */}

{/* @playground id="utf8-encode" template="encode" */}
```

**配置说明**:

- `id`: 对应文档目录下的同名文件/文件夹
- `template`:
  - `demo` - 演示代码，只读模式
  - `exercise` - 练习模式，可编辑
  - `test` - 测试模式，包含测试用例
  - `data-structure` - 数据结构可视化
  - `encode` - 编码过程可视化

**作用域机制**:

- **插入位置**: 在当前注释位置插入交互组件
- **组件渲染**: 动态加载对应的 React 组件
- **状态管理**: 独立的组件状态，不影响页面其他部分

```typescript
// MDX 处理器实现机制
interface PlaygroundProcessor {
  // 解析注释配置
  parseComment(comment: string): PlaygroundConfig;
  
  // 查找对应文件
  resolveFile(id: string, template: string): Promise<FileContent>;
  
  // 生成 React 组件
  generateComponent(config: PlaygroundConfig, content: FileContent): ReactElement;
  
  // 在 MDX 中替换注释为组件
  injectComponent(mdxContent: string, position: number): string;
}

**文件查找规则**:

1. 同级目录下寻找 `{id}.js` 或 `{id}/` 文件夹
2. 如果不存在，查找同级 `_examples/{id}/` 目录
3. 支持多语言: `{id}.js`, `{id}.py`, `{id}.java`

**示例文件结构**:

```

docs/algorithms/sort/
├── quick-sort.md              # 当前文档
├── quick-sort-demo.js         # demo 模式代码
├── quick-sort-exercise.js     # exercise 模式代码
├── _examples/
│   ├── binary-tree-viz/       # 数据结构可视化配置
│   │   └── config.json
│   └── utf8-encode/           # 编码可视化配置
│       └── config.json
└──_tests/
    └── quick-sort.test.js     # 测试用例

```

### 2. 数据结构可视化

**使用方式**: 简洁 DSL 语法，支持 BNF 语法定义，图灵完备，基于 AntV G2 可视化引擎

```markdown
```binary-tree
8,3,10,1,6,14,4,7,13
operations: insert,delete,search
animation: slow
interactive: true
```

```graph
nodes: A,B,C,D,E
edges: A-B,B-C,C-D,D-A,A-E
algorithm: bfs
start: A
highlight: path
```

```array
data: 64,34,25,12,22,11,90
algorithm: quicksort
step: auto
compare: highlight
```

**DSL 语法设计 (BNF 定义)**:

```bnf
<visualization> ::= <type> <data> <options>*

<type> ::= "binary-tree" | "graph" | "array" | "linked-list" | "stack" | "queue" | "hash-table"

<data> ::= <number-list> | <node-list> | <edge-list>
<number-list> ::= <number> ("," <number>)*
<node-list> ::= <identifier> ("," <identifier>)*
<edge-list> ::= <edge> ("," <edge>)*
<edge> ::= <identifier> "-" <identifier>

<options> ::= <option-name> ":" <option-value>
<option-name> ::= "operations" | "algorithm" | "animation" | "interactive" | "highlight" | "step"
<option-value> ::= <string> | <boolean> | <number>

<boolean> ::= "true" | "false"
<string> ::= <identifier> | <identifier-list>
<identifier-list> ::= <identifier> ("," <identifier>)*
```

**AntV G2 集成方案**:

```typescript
interface DataStructureRenderer {
  type: DSType;
  data: any[];
  options: VisualizationOptions;
  g2Chart: G2Chart;
  
  // 渲染方法
  render(): void;
  update(data: any[]): void;
  animate(operation: Operation): Promise<void>;
  
  // 交互方法  
  onNodeClick(callback: (node: any) => void): void;
  onStepNext(): void;
  onStepPrev(): void;
}
```

**支持的类型和操作**:

- `binary-tree`: insert, delete, search, traverse (基于 G2 树形布局)
- `graph`: bfs, dfs, dijkstra, mst (基于 G2 力导向布局)
- `array`: sort, search, partition (基于 G2 柱状图)
- `linked-list`: insert, delete, traverse (基于 G2 路径图)
- `stack`, `queue`: push, pop, peek (基于 G2 动态图表)
- `hash-table`: put, get, remove, rehash (基于 G2 散点图)

### 3. 编码可视化

```markdown
```encode-viz type="utf8"
input: "Hello 世界"
show: ["binary", "hex", "steps"]
```

```encode-viz type="huffman"
input: "abracadabra"
show: ["tree", "table", "compressed"]
```

### 4. 相关题目推荐

**简化为原生 markdown**:

```markdown
## 相关题目

- [15. 三数之和](/leetcode/15) - 扩展到三个数组合
- [18. 四数之和](/leetcode/18) - 进一步扩展  
- [167. 两数之和 II](/leetcode/167) - 有序数组版本
```

### 5. 数学公式

**继续使用 KaTeX**:

```markdown
行内公式: $E = mc^2$

块级公式:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## 内容自动生成系统

### 1. 目录结构解析规则

**扫描规则**

```typescript
// 排序规则
1. 有序号前缀的按照数字大小排序 (1.xxx, 2.xxx, 01.xxx, 02.xxx)
2. 没有序号的按照字母顺序排序
3. 有序号的排在没有序号的前面
```

**导航生成示例**

```
docs 目录结构:
├── 1.data-structures/         → 权重: 1
│   ├── index.md               → 数据结构主页
│   ├── 01.linear/            → 权重: 1.1
│   └── 02.tree/              → 权重: 1.2
├── 2.algorithms/             → 权重: 2
├── math/                    → 权重: 999 (无序号)
└── encode/                  → 权重: 999 (无序号)

生成的路由:
├── /data-structures (数据结构主页)
├── /data-structures/linear/array (数组详情)
├── /algorithms (算法主页)
├── /leetcode (LeetCode主页)
├── /math (数学主页 - 自动生成)
└── /encode (编码主页 - 自动生成)
```

## 站点配置系统

### 1. 配置文件结构

**根目录配置 (sites.config.ts)**:

```typescript
import { defineConfig } from './.sites/config/defineConfig'

export default defineConfig({
  // 站点基础配置
  site: {
    title: "算法学习平台",
    description: "交互式算法与数据结构学习平台",
    author: "算法学习团队",
    url: "http://blog.zenheart.site/learn-algorithm",
    baseUrl: "/learn-algorithm/",
    favicon: "/favicon.ico"
  },
  
  // 导航配置
  nav: [
    { text: "首页", link: "/" },
    { text: "数据结构", link: "/data-structures" },
    { text: "算法", link: "/algorithms" },
    { text: "题目练习", link: "/leetcode" },
    { text: "数学基础", link: "/math" },
    { text: "编码原理", link: "/encode" },
    { text: "在线验证", link: "/playground" }
  ],

  // 侧边栏配置 (自动生成 + 手动配置)
  sidebar: {
    auto: true, // 自动从 docs 目录生成
    customization: {
      "/data-structures": [
        {
          text: "概述",
          link: "/data-structures/"
        },
        {
          text: "线性结构",
          children: [
            { text: "数组", link: "/data-structures/linear/array" },
            { text: "链表", link: "/data-structures/linear/linked-list" }
          ]
        }
      ]
    }
  },

  // 主题配置
  theme: {
    name: "algorithm-learning",
    config: {
      colorMode: {
        defaultMode: "light",
        disableSwitch: false
      },
      logo: {
        src: "/logo.svg",
        alt: "算法学习平台"
      },
      editLink: {
        pattern: "https://github.com/username/learn-algorithm/edit/main/docs/:path",
        text: "编辑此页"
      },
      search: {
        provider: "local",
        options: {
          placeholder: "搜索文档..."
        }
      }
    }
  },

  // 插件配置
  plugins: [
    {
      name: "@algorithm-learning/plugin-playground",
      options: {
        templates: ["demo", "exercise", "test", "data-structure", "encode"],
        defaultLanguage: "javascript",
        supportedLanguages: ["javascript", "python", "java", "cpp"]
      }
    },
    {
      name: "@algorithm-learning/plugin-visualization",
      options: {
        dataStructures: ["binary-tree", "graph", "array", "linked-list"],
        encoding: ["utf8", "ascii", "huffman", "base64"],
        animation: {
          defaultSpeed: "normal",
          enableControls: true
        }
      }
    },
    {
      name: "@algorithm-learning/plugin-math",
      options: {
        katex: {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ]
        }
      }
    }
  ],

  // 构建配置
  build: {
    outputDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: true
  },
  
  // markdown 配置
  markdown: {
    lineNumbers: true,
    anchor: {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: "¶"
    },
    toc: {
      includeLevel: [2, 3, 4]
    },
    codeHighlight: {
      theme: "github-dark",
      lineNumbers: true
    }
  },

  // PWA 配置
  pwa: {
    enabled: true,
    manifest: {
      name: "算法学习平台",
      short_name: "算法学习",
      description: "交互式算法与数据结构学习平台",
      theme_color: "#3b82f6",
      background_color: "#ffffff"
    }
  },

  // SEO 配置
  seo: {
    meta: {
      keywords: ["算法", "数据结构", "编程", "学习", "可视化"],
      author: "算法学习团队"
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      image: "/og-image.png"
    }
  }
})
```

### 2. 项目目录重构

```
learn-algorithm/
├── sites.config.ts            # 站点配置文件 (TypeScript)
├── package.json
├── vite.config.ts
├── docs/                      # 内容目录 (独立)
│   ├── algorithms/
│   ├── data-structures/ 
│   ├── encode/
│   ├── leetcode/
│   └── math/
├── .sites/                    # 站点构建系统 (可独立迁移)
│   ├── config/
│   │   ├── defineConfig.ts    # 配置定义函数
│   │   ├── siteConfig.ts      # 配置解析器
│   │   ├── types.ts           # 配置类型定义
│   │   └── pluginLoader.ts    # 插件加载器
│   ├── core/
│   │   ├── builder.ts         # 站点构建器
│   │   ├── router.ts          # 路由生成器
│   │   └── contentProcessor.ts # 内容处理器
│   ├── plugins/               # 内置插件
│   │   ├── playground/
│   │   ├── visualization/
│   │   └── math/
│   └── themes/                # 主题系统
│       ├── default/
│       └── algorithm-learning/
├── src/                       # 应用源码
│   ├── components/
│   ├── pages/
│   └── utils/
└── public/
    ├── favicon.ico
    └── logo.svg
```

### 3. 插件系统架构

**插件接口定义**:

```typescript
// .sites/types/plugin.ts
export interface Plugin {
  name: string;
  version: string;
  apply: (context: PluginContext) => void | Promise<void>;
  configResolved?: (config: SiteConfig) => void;
  buildStart?: () => void;
  buildEnd?: () => void;
  transformMarkdown?: (content: string, path: string) => string;
  generateRoutes?: (routes: Route[]) => Route[];
}

export interface PluginContext {
  config: SiteConfig;
  addRoute: (route: Route) => void;
  addComponent: (name: string, component: any) => void;
  registerMarkdownProcessor: (processor: MarkdownProcessor) => void;
}
```

**内置插件示例**:

```typescript
// .sites/plugins/playground/index.ts
export const PlaygroundPlugin: Plugin = {
  name: "@algorithm-learning/plugin-playground",
  version: "1.0.0",
  
  apply(context) {
    // 注册 @playground 注释处理器
    context.registerMarkdownProcessor({
      name: "playground",
      test: /\/\*\s*@playground\s+.*?\*\//g,
      transform: (match, content, path) => {
        const config = parsePlaygroundConfig(match);
        return generatePlaygroundComponent(config);
      }
    });
    
    // 添加 playground 路由
    context.addRoute({
      path: "/playground",
      component: "PlaygroundPage"
    });
    
    // 注册组件
    context.addComponent("PlaygroundEditor", PlaygroundEditor);
    context.addComponent("CodeRunner", CodeRunner);
  }
};
```

### 4. 主题系统

**主题配置**:

```typescript
// .sites/themes/algorithm-learning/index.ts
export const AlgorithmLearningTheme = {
  name: "algorithm-learning",
  layouts: {
    default: DefaultLayout,
    home: HomeLayout,
    detail: DetailLayout,
    playground: PlaygroundLayout
  },
  components: {
    Header: ThemedHeader,
    Sidebar: ThemedSidebar,
    Footer: ThemedFooter,
    CodeBlock: ThemedCodeBlock
  },
  styles: {
    base: "./styles/base.css",
    components: "./styles/components.css",
    utilities: "./styles/utilities.css"
  },
  config: {
    colors: {
      primary: "#3b82f6",
      secondary: "#64748b",
      accent: "#f59e0b"
    },
    fonts: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      mono: ["Fira Code", "ui-monospace", "monospace"]
    }
  }
};
```

### 5. 配置解析系统

```typescript
// .sites/config/types.ts
export interface SiteConfig {
  site: {
    title: string;
    description: string;
    author: string;
    url: string;
    baseUrl: string;
    favicon: string;
  };
  nav: Array<{
    text: string;
    link: string;
  }>;
  sidebar: {
    auto: boolean;
    customization?: Record<string, any>;
  };
  theme: {
    name: string;
    config: Record<string, any>;
  };
  plugins: Array<{
    name: string;
    options?: Record<string, any>;
  }>;
  build: {
    outputDir: string;
    assetsDir: string;
    sourcemap: boolean;
    minify: boolean;
  };
  // ... 其他配置项
}

// .sites/config/defineConfig.ts
export function defineConfig(config: SiteConfig): SiteConfig {
  return config;
}

// .sites/config/siteConfig.ts
export class SiteConfigLoader {
  private static instance: SiteConfigLoader;
  private config: SiteConfig;
  
  static async load(configPath = "sites.config.ts"): Promise<SiteConfig> {
    if (!this.instance) {
      this.instance = new SiteConfigLoader();
      await this.instance.loadConfig(configPath);
    }
    return this.instance.config;
  }
  
  private async loadConfig(configPath: string) {
    // 动态导入 TypeScript 配置文件
    const configModule = await import(path.resolve(configPath));
    const rawConfig = configModule.default || configModule;
    
    // 验证配置
    this.validateConfig(rawConfig);
    
    // 合并默认配置
    this.config = this.mergeWithDefaults(rawConfig);
    
    // 处理环境变量
    this.processEnvironmentVariables();
    
    // 加载插件
    await this.loadPlugins();
  }
  
  private validateConfig(config: any): void {
    // TypeScript 已提供编译时类型检查
    // 这里只需要运行时验证
    if (!config.site?.title) {
      throw new Error('Site title is required');
    }
    if (!config.site?.baseUrl) {
      throw new Error('Site baseUrl is required');
    }
  }
  
  private async loadPlugins() {
    for (const pluginConfig of this.config.plugins) {
      const plugin = await this.loadPlugin(pluginConfig);
      this.applyPlugin(plugin, pluginConfig.options);
    }
  }
}
```

### 6. 构建系统集成

**Vite 插件**:

```typescript
// .sites/vite-plugin/index.ts
import { SiteConfigLoader } from '../config/siteConfig'
import type { SiteConfig } from '../config/types'

export function siteBuilderPlugin(configPath = 'sites.config.ts'): PluginOption {
  let siteConfig: SiteConfig;
  
  return {
    name: "site-builder",
    
    async configResolved(config) {
      // 加载 TypeScript 配置文件
      siteConfig = await SiteConfigLoader.load(configPath);
      
      // 动态配置 Vite
      config.base = siteConfig.site.baseUrl;
      config.build.outDir = siteConfig.build.outputDir;
      config.build.assetsDir = siteConfig.build.assetsDir;
      config.build.sourcemap = siteConfig.build.sourcemap;
      config.build.minify = siteConfig.build.minify;
    },
    
    async buildStart() {
      // 生成路由
      await generateRoutes(siteConfig);
      
      // 处理 markdown 文件
      await processMarkdownFiles(siteConfig);
      
      // 应用插件
      await applyPlugins(siteConfig);
    },
    
    load(id) {
      // 处理虚拟模块
      if (id === "virtual:site-config") {
        return `export default ${JSON.stringify(siteConfig, null, 2)}`;
      }
    },
    
    handleHotUpdate(ctx) {
      // 热更新配置文件
      if (ctx.file.endsWith('sites.config.ts')) {
        console.log('Site config changed, reloading...');
        // 重新加载配置
        return [];
      }
    }
  };
}
```

## 技术实现架构

### 1. 项目依赖配置

```json
{
  "name": "algorithm-learning-platform",
  "version": "1.0.0",
  "type": "module",
  "homepage": "http://blog.zenheart.site/learn-algorithm",
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    
    "@mdx-js/react": "^3.1.0",
    "@mdx-js/rollup": "^3.1.0",
    "remark-math": "^6.0.0",
    "rehype-katex": "^7.0.0",
    "remark-gfm": "^4.0.0",
    
    "@codemirror/view": "^6.34.0",
    "@codemirror/state": "^6.4.0",
    "@codemirror/lang-javascript": "^6.2.0",
    "@codemirror/lang-python": "^6.1.0",
    "@codemirror/theme-one-dark": "^6.1.2",
    
    "@deno/wasm": "^1.44.0",
    
    "@antv/g2": "^5.2.0",
    "@antv/g": "^6.0.0",
    "@antv/util": "^3.3.0",
    
    "d3": "^7.9.0",
    "framer-motion": "^11.0.0",
    "katex": "^0.16.9",
    
    "zustand": "^4.5.0",
    "clsx": "^2.1.0",
    "tailwindcss": "^3.4.0",
    
    "gray-matter": "^4.0.3",
    "globby": "^14.0.0",
    "chokidar": "^3.6.0",
    "fs-extra": "^11.2.0"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "@vitejs/plugin-react": "^4.7.0",
    "typescript": "^5.5.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/d3": "^7.4.0",
    "@types/fs-extra": "^11.0.4",
    
    "eslint": "^9.9.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "prettier": "^3.3.0",
    
    "vitest": "^3.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.0",
    
    "gh-pages": "^6.1.0",
    "terser": "^5.31.0",
    "rollup-plugin-visualizer": "^5.12.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview --port 3000",
    "deploy": "npm run build && gh-pages -d dist",
    "test": "vitest",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives",
    "format": "prettier --write .",
    "site:dev": "vite --config .sites/vite.config.ts",
    "site:build": "vite build --config .sites/vite.config.ts",
    "site:serve": "vite preview --config .sites/vite.config.ts"
  }
}
```

### 2. Vite 配置集成

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mdx } from '@mdx-js/rollup'
import { siteBuilderPlugin } from './.sites/vite-plugin'

export default defineConfig({
  plugins: [
    // 站点构建插件 (优先级最高)
    siteBuilderPlugin('sites.config.ts'),
    
    react(),
    
    // MDX 插件 (由站点配置动态配置)
    mdx({
      providerImportSource: "@mdx-js/react"
    })
  ],
  
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/services': '/src/services',
      '@/sites': '/.sites',
      'virtual:site-config': 'virtual:site-config'
    }
  },
  
  // 以下配置将由 siteBuilderPlugin 根据 sites.config.ts 动态设置
  // base: 从 site.baseUrl 动态设置
  // build.outDir: 从 build.outputDir 动态设置
  // build.assetsDir: 从 build.assetsDir 动态设置
  // build.sourcemap: 从 build.sourcemap 动态设置
  // build.minify: 从 build.minify 动态设置
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'codemirror': ['@codemirror/view', '@codemirror/state'],
          'visualization': ['d3', 'framer-motion'],
          'math': ['katex'],
          'deno-wasm': ['@deno/wasm']
        }
      }
    }
  },
  
  optimizeDeps: {
    include: ['@mdx-js/react', 'katex', 'd3']
  }
})
```

### 3. 站点构建系统详细目录

```
learn-algorithm/
├── sites.config.ts            # 🔧 站点配置文件 (TypeScript)
├── package.json
├── vite.config.ts
├── docs/                      # 📁 内容目录 (完全独立)
│   ├── algorithms/
│   ├── data-structures/ 
│   ├── encode/
│   ├── leetcode/
│   └── math/
├── .sites/                    # 🏗️ 站点构建系统 (可独立迁移)
│   ├── config/
│   │   ├── defineConfig.ts    # 配置定义函数
│   │   ├── types.ts           # 完整类型定义
│   │   ├── siteConfig.ts      # 配置解析和验证
│   │   ├── pluginLoader.ts    # 插件动态加载
│   │   ├── themeLoader.ts     # 主题加载器
│   │   └── defaults.ts        # 默认配置
│   ├── core/
│   │   ├── builder.ts         # 站点构建核心
│   │   ├── router.ts          # 动态路由生成
│   │   ├── contentProcessor.ts # 内容处理和转换
│   │   ├── markdownProcessor.ts # Markdown 处理
│   │   └── sidebarGenerator.ts # 侧边栏自动生成
│   ├── plugins/               # 🔌 内置插件系统
│   │   ├── playground/
│   │   │   ├── index.ts       # 插件入口
│   │   │   ├── processor.ts   # @playground 处理器
│   │   │   ├── components/    # 插件组件
│   │   │   └── types.ts      # 插件类型
│   │   ├── visualization/
│   │   │   ├── index.ts
│   │   │   ├── dataStructure.ts
│   │   │   ├── encoding.ts
│   │   │   └── components/
│   │   ├── math/
│   │   │   ├── index.ts
│   │   │   ├── katex.ts
│   │   │   └── components/
│   │   └── search/
│   │       ├── index.ts
│   │       └── localSearch.ts
│   ├── themes/                # 🎨 主题系统
│   │   ├── default/
│   │   │   ├── index.ts
│   │   │   ├── layouts/
│   │   │   ├── components/
│   │   │   └── styles/
│   │   └── algorithm-learning/
│   │       ├── index.ts       # 主题配置
│   │       ├── layouts/       # 布局组件
│   │       │   ├── DefaultLayout.tsx
│   │       │   ├── HomeLayout.tsx
│   │       │   ├── DetailLayout.tsx
│   │       │   └── PlaygroundLayout.tsx
│   │       ├── components/    # 主题组件
│   │       │   ├── Header.tsx
│   │       │   ├── Sidebar.tsx
│   │       │   ├── Footer.tsx
│   │       │   ├── CodeBlock.tsx
│   │       │   └── TOC.tsx
│   │       └── styles/        # 主题样式
│   │           ├── base.css
│   │           ├── components.css
│   │           ├── utilities.css
│   │           └── theme.css
│   ├── types/                 # 🏷️ 类型定义
│   │   ├── config.ts          # 配置类型
│   │   ├── plugin.ts          # 插件类型
│   │   ├── theme.ts           # 主题类型
│   │   └── content.ts         # 内容类型
│   ├── utils/                 # 🛠️ 工具函数
│   │   ├── file.ts
│   │   ├── markdown.ts
│   │   ├── path.ts
│   │   └── validation.ts
│   └── vite-plugin/           # ⚡ Vite 集成
│       ├── index.ts           # 主插件
│       ├── configPlugin.ts    # 配置插件
│       └── devPlugin.ts       # 开发插件
├── src/                       # 💻 应用源码 (简化)
│   ├── main.tsx              # 应用入口
│   ├── App.tsx               # 根组件
│   ├── hooks/                # 自定义 hooks
│   │   ├── useSiteConfig.ts  # 站点配置 hook
│   │   └── useTheme.ts       # 主题 hook
│   ├── utils/                # 应用工具
│   │   └── router.ts         # 路由工具
│   └── stores/               # 状态管理
│       ├── themeStore.ts     # 主题状态
│       └── searchStore.ts    # 搜索状态
└── public/                   # 🌐 静态资源
    ├── favicon.ico
    ├── logo.svg
    ├── CNAME                 # GitHub Pages 域名
    └── .nojekyll            # 禁用 Jekyll
```

### 4. 与 Docusaurus/VitePress 对齐特性

**参考 Docusaurus 特性**:

- 📝 配置驱动的网站生成
- 🔌 丰富的插件生态系统
- 🎨 主题系统和自定义能力
- 📱 响应式设计和移动端优化
- 🔍 内置搜索功能
- 🌐 国际化支持 (预留)
- 📊 SEO 优化

**参考 VitePress 特性**:

- ⚡ 基于 Vite 的快速构建
- 📄 Markdown 优先的内容管理
- 🎯 简洁的配置体验
- 🚀 优秀的开发体验
- 📦 轻量级的运行时
- 🔧 灵活的自定义能力

**算法学习平台特色**:

- 🎮 交互式代码执行环境
- 📊 数据结构可视化
- 🔐 编码过程演示
- 🧮 数学公式渲染
- 🎯 教学场景优化
- 📚 学习路径引导

### 5. 站点构建系统迁移指南

**独立性设计**:

```
learn-algorithm/
├── sites.config.ts         # 站点配置 (TypeScript，可迁移)
├── docs/                   # 内容目录 (完全独立)
└── .sites/                 # 构建系统 (可整体迁移)
```

**迁移到其他项目**:

1. 复制 `.sites/` 目录到新项目
2. 复制或调整 `sites.config.ts` 配置
3. 配置 `vite.config.ts` 集成站点插件
4. 内容目录 `docs/` 可独立存在

**TypeScript 配置优势**:

- ✅ **类型安全**: 编译时类型检查，避免配置错误
- ✅ **智能提示**: IDE 提供完整的代码补全
- ✅ **重构友好**: 支持重命名和查找引用
- ✅ **模块化**: 支持导入其他配置文件和常量

**扩展为独立包**:

```bash
# 未来可发布为独立 npm 包
npm install @algorithm-learning/site-builder

# 在任何项目中使用
import { siteBuilderPlugin } from '@algorithm-learning/site-builder'
```

**与其他框架集成**:

- 核心构建逻辑与 React 解耦
- 可适配其他前端框架 (Vue, Svelte)
- 插件系统支持任意组件库
- 主题系统框架无关

### 6. TypeScript 配置系统详解

**类型定义结构**:

```typescript
// .sites/config/types.ts
export interface SiteConfig {
  site: SiteInfo;
  nav: NavItem[];
  sidebar: SidebarConfig;
  theme: ThemeConfig;
  plugins: PluginConfig[];
  build: BuildConfig;
  markdown: MarkdownConfig;
  pwa?: PWAConfig;
  seo?: SEOConfig;
}

export interface SiteInfo {
  title: string;
  description: string;
  author: string;
  url: string;
  baseUrl: string;
  favicon?: string;
  lang?: string;
}

export interface NavItem {
  text: string;
  link?: string;
  children?: NavItem[];
  activeMatch?: string;
}

export interface PluginConfig {
  name: string;
  options?: Record<string, any>;
}

// ... 其他详细类型定义
```

**配置验证和默认值**:

```typescript
// .sites/config/defaults.ts
export const defaultConfig: Partial<SiteConfig> = {
  site: {
    lang: 'zh-CN',
    favicon: '/favicon.ico'
  },
  theme: {
    name: 'default',
    config: {
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false
      }
    }
  },
  build: {
    outputDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true
  },
  markdown: {
    lineNumbers: false,
    anchor: {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '¶'
    }
  }
};
```

**智能提示和验证**:

```typescript
// sites.config.ts 中的智能提示示例
export default defineConfig({
  site: {
    title: "算法学习平台", // ✅ 必填字段，类型检查
    // description: "", // ❌ TypeScript 会提示缺少必填字段
  },
  
  nav: [
    {
      text: "首页",
      link: "/", // ✅ 正确的路径格式
      // link: "home" // ❌ 类型检查会提示路径应以 / 开头
    }
  ],
  
  plugins: [
    {
      name: "@algorithm-learning/plugin-playground",
      options: {
        templates: ["demo", "exercise"], // ✅ 预定义的模板类型
        // templates: ["invalid"] // ❌ 类型检查会提示无效的模板类型
      }
    }
  ]
})
```

### 7. 静态部署配置

**GitHub Actions 工作流 (.github/workflows/deploy.yml)**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build site
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**路由配置 (适配子路径)**

```typescript
// src/main.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const baseUrl = import.meta.env.BASE_URL || '/'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "data-structures", element: <DataStructuresPage /> },
      { path: "algorithms", element: <AlgorithmsPage /> },
      { path: "leetcode", element: <LeetCodePage /> },
      { path: "math", element: <MathPage /> },
      { path: "encode", element: <EncodePage /> },
      { path: "playground", element: <PlaygroundPage /> },
      { path: ":module/:category?/:topic?", element: <DetailPage /> }
    ]
  }
], {
  basename: baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
})
```

## 开发实施计划

### 开发阶段 (12周)

**Phase 1: 站点构建系统 (Week 1-4)**

- 站点配置系统 (sites.yaml 解析)
- 插件系统架构设计
- 主题系统基础框架
- Vite 插件集成
- 基础目录结构和工具函数

**Phase 2: 核心功能开发 (Week 5-9)**

- 内置插件开发 (playground, visualization, math)
- @playground 注释处理器
- 数据结构可视化配置化
- 编码可视化系统
- CodeMirror + Deno WASM 集成
- 默认主题开发

**Phase 3: 功能完善 (Week 10-12)**

- Playground 页面开发和集成
- 内容自动生成和路由
- 搜索功能集成
- 响应式设计和主题切换
- 性能优化和测试
- GitHub Pages 部署配置

### 关键里程碑

| 里程碑 | 完成时间 | 交付内容 |
|--------|----------|----------|
| 站点系统 MVP | Week 4 | 配置系统 + 插件架构 + 主题框架 |
| 功能完整版 | Week 9 | 所有插件 + 可视化系统 + 主题 |
| 生产就绪版 | Week 12 | 完整功能 + 性能优化 + 部署配置 |

## 质量保证与性能标准

### 性能指标

| 指标 | 目标值 | 测试方法 |
|------|--------|----------|
| 首屏加载时间 | < 2秒 | Lighthouse 测试 |
| 页面切换时间 | < 300ms | React Router 客户端路由 |
| 代码执行响应 | < 1秒 | Deno WASM 性能测试 |
| 包体积 (gzipped) | < 2MB | 构建分析 |
| Core Web Vitals | 绿色 | PageSpeed Insights |

### 用户体验标准

- **响应式设计**: 支持桌面、平板、手机
- **主题支持**: 浅色主题、深色主题
- **键盘导航**: 完整的键盘快捷键支持
- **搜索功能**: 准确快速的内容搜索

## Playground 页面设计

### 1. 页面功能

**主要目标**: 提供一个独立的验证环境，支持用户测试和验证不同类型的 template 功能

**核心功能**:

- 多种 template 类型切换 (demo, exercise, test, data-structure, encode)
- 实时代码编辑和执行
- 可视化效果预览
- 默认示例展示

### 2. 页面布局

```
/playground

Header: 导航 | 主题切换
├── 左侧配置面板
│   ├── Template 类型选择
│   │   ├── □ Demo (演示模式)
│   │   ├── □ Exercise (练习模式) 
│   │   ├── □ Test (测试模式)
│   │   ├── □ Data Structure (数据结构可视化)
│   │   └── □ Encode (编码可视化)
│   ├── 示例选择器
│   │   ├── 快速排序
│   │   ├── 二叉树遍历
│   │   ├── 图的搜索
│   │   ├── UTF-8 编码
│   │   └── 霍夫曼编码
│   └── 配置参数
│       ├── 语言选择
│       ├── 主题切换
│       └── 动画速度
└── 右侧主内容区
    ├── 代码编辑器 (上部)
    ├── 可视化展示 (中部)
    └── 输出控制台 (下部)
```

### 3. 默认示例配置

**Demo 模式示例**:

```javascript
// 快速排序演示
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

console.log(quickSort([64, 34, 25, 12, 22, 11, 90]));
```

**Data Structure 模式示例**:

```json
{
  "type": "binary-tree",
  "data": [8, 3, 10, 1, 6, 14, 4, 7, 13],
  "operations": ["insert", "delete", "search"],
  "animation": {
    "speed": "normal",
    "highlight": true,
    "showSteps": true
  }
}
```

**Encode 模式示例**:

```json
{
  "type": "utf8",
  "input": "Hello 世界",
  "options": {
    "showBinary": true,
    "showHex": true,
    "showSteps": true,
    "encoding": "utf-8"
  }
}
```

### 4. 交互功能

**Template 切换**:

- 实时切换不同模式
- 保存当前编辑状态
- 自动加载对应示例

**代码执行**:

- 实时语法检查
- 一键运行/测试
- 错误提示和调试

**可视化控制**:

- 播放/暂停动画
- 单步执行模式
- 重置到初始状态
- 导出配置文件

**分享功能**:

- 生成分享链接
- 导出代码片段
- 复制配置到剪贴板

## 技术实现详细方案

### 1. Deno WASM 集成架构

**核心实现方案**:

```typescript
interface DenoWASMIntegration {
  // 沙箱环境配置
  sandbox: {
    timeout: 10000;           // 10秒超时
    memoryLimit: '128MB';     // 内存限制
    allowedAPIs: [            // 允许的 API
      'console.log',
      'Math.*',
      'Array.*',
      'Object.*'
    ];
    forbiddenOperations: [    // 禁止的操作
      'fetch',
      'WebSocket',
      'localStorage',
      'eval'
    ];
  };
  
  // 模块加载策略
  moduleLoading: 'dynamic';   // 动态加载模块
  
  // 错误边界
  errorHandling: {
    syntaxError: '实时语法检查和错误提示';
    runtimeError: '运行时错误捕获和友好提示';
    timeout: '超时自动终止并提示用户';
    memoryOverflow: '内存溢出保护';
  };
}
```

**实现细节**:

```typescript
class DenoCodeRunner {
  private wasmInstance: Deno.WasmInstance;
  private workerPool: Worker[];
  
  async executeCode(code: string, language: string): Promise<ExecutionResult> {
    // 1. 代码预处理和安全检查
    const sanitizedCode = this.sanitizeCode(code);
    
    // 2. 在独立 Worker 中执行
    const worker = this.getAvailableWorker();
    
    // 3. 设置超时和资源限制
    return this.executeInSandbox(worker, sanitizedCode, {
      timeout: 10000,
      memoryLimit: 128 * 1024 * 1024
    });
  }
  
  private sanitizeCode(code: string): string {
    // 移除危险操作
    // 添加安全包装
    return code;
  }
}
```

### 2. AntV G2 可视化引擎

**DSL 解析器实现**:

```typescript
class DSLParser {
  private grammar: BNFGrammar;
  
  constructor() {
    this.grammar = this.loadBNFGrammar();
  }
  
  parse(dslCode: string): VisualizationAST {
    // 1. 词法分析
    const tokens = this.tokenize(dslCode);
    
    // 2. 语法分析
    const ast = this.parseTokens(tokens);
    
    // 3. 语义分析
    return this.validateAndTransform(ast);
  }
  
  generateG2Config(ast: VisualizationAST): G2ChartConfig {
    // 将 AST 转换为 AntV G2 配置
    return {
      type: ast.type,
      data: ast.data,
      encode: this.mapEncode(ast.options),
      transform: this.mapTransforms(ast.operations),
      interaction: this.mapInteractions(ast.interactive)
    };
  }
}
```

**可视化组件架构**:

```typescript
interface VisualizationComponent {
  // G2 图表实例
  chart: G2Chart;
  
  // 数据管理
  data: any[];
  setData(data: any[]): void;
  
  // 动画控制
  animate(operation: Operation): Promise<void>;
  playAnimation(): void;
  pauseAnimation(): void;
  stepForward(): void;
  stepBackward(): void;
  
  // 交互处理
  onNodeClick(callback: (node: any) => void): void;
  onEdgeClick(callback: (edge: any) => void): void;
  
  // 生命周期
  mount(container: HTMLElement): void;
  unmount(): void;
  resize(): void;
}
```

### 3. MDX 处理器架构

**注释解析和组件注入**:

```typescript
class MDXPlaygroundProcessor {
  process(mdxContent: string): string {
    // 1. 查找所有 @playground 注释
    const playgroundComments = this.findPlaygroundComments(mdxContent);
    
    // 2. 并行处理所有注释
    const componentPromises = playgroundComments.map(comment => 
      this.processComment(comment)
    );
    
    // 3. 替换注释为 React 组件
    return this.injectComponents(mdxContent, componentPromises);
  }
  
  private processComment(comment: PlaygroundComment): Promise<ReactComponent> {
    // 解析配置
    const config = this.parseConfig(comment.content);
    
    // 查找文件
    const fileContent = await this.resolveFile(config);
    
    // 生成组件
    return this.generateComponent(config, fileContent);
  }
  
  private async resolveFile(config: PlaygroundConfig): Promise<FileContent> {
    // 按优先级查找文件
    const searchPaths = [
      `${config.basePath}/${config.id}.${config.language}`,
      `${config.basePath}/${config.id}/index.${config.language}`,
      `${config.basePath}/_examples/${config.id}/${config.template}.${config.language}`
    ];
    
    for (const path of searchPaths) {
      if (await this.fileExists(path)) {
        return this.loadFile(path);
      }
    }
    
    throw new Error(`File not found for playground: ${config.id}`);
  }
}
```

### 4. 错误处理和用户体验

**错误处理策略**:

```typescript
interface ErrorHandlingStrategy {
  // 代码执行错误
  codeExecution: {
    syntaxError: {
      display: 'inline-error-marker';
      message: '语法错误提示';
      suggestion: '修复建议';
    };
    runtimeError: {
      display: 'error-console';
      stackTrace: 'simplified';
      debugging: 'line-highlight';
    };
    timeout: {
      display: 'timeout-modal';
      action: 'auto-terminate';
      recovery: 'manual-retry';
    };
  };
  
  // 可视化错误
  visualization: {
    loadingFailure: {
      fallback: 'error-placeholder';
      retry: 'automatic';
    };
    renderError: {
      fallback: 'static-diagram';
      logging: 'error-tracking';
    };
    dataInvalid: {
      validation: 'schema-check';
      correction: 'auto-fix';
    };
  };
  
  // 网络错误
  network: {
    offline: {
      detection: 'navigator.onLine';
      caching: 'service-worker';
      notification: 'status-banner';
    };
  };
}
```

**性能优化策略**:

```typescript
interface PerformanceOptimization {
  // 代码编辑器优化
  codeEditor: {
    lazyLoading: true;
    syntaxHighlight: 'web-worker';
    debounceDelay: 300;
    virtualScrolling: true;
  };
  
  // 可视化优化
  visualization: {
    renderEngine: 'canvas';        // 使用 Canvas 而非 SVG
    animationFrames: 'raf';        // 使用 requestAnimationFrame
    dataStreaming: true;           // 大数据集流式处理
    memoryManagement: 'gc-aware';  // 垃圾回收感知
  };
  
  // 资源加载优化
  assets: {
    codeSpliitting: 'route-based';
    lazyComponents: 'intersection-observer';
    imageOptimization: 'webp-avif';
    fontPreloading: 'critical-path';
  };
}
```

### 5. 移动端适配策略

**响应式交互设计**:

```typescript
interface MobileAdaptation {
  // 触摸交互
  touchGestures: {
    pinchZoom: '缩放可视化图表';
    swipeNavigation: '左右滑动切换步骤';
    longPress: '显示详细信息';
    doubleTap: '重置视图';
  };
  
  // 代码编辑器适配
  codeEditor: {
    fontSize: 'responsive';
    touchTargets: '44px-minimum';
    virtualKeyboard: 'optimized';
    selectionHandles: 'enhanced';
  };
  
  // 布局适配
  layout: {
    stackedLayout: 'mobile-portrait';
    tabInterface: 'mobile-landscape';
    collapsibleSections: 'accordion-style';
  };
}
```

## 技术问题与澄清

基于以上详细的技术实现方案，还有几个开发实施细节需要确认：

### 1. DSL 解析器实现优先级

对于 BNF 语法解析器，您希望：

- **自研解析器**: 完全控制语法，支持扩展，但开发工作量大
- **基于现有解析器**: 如 ANTLR4、PEG.js 等，快速实现但定制性受限
- **渐进式实现**: 先支持基础语法，后续迭代添加高级特性

### 2. 文件查找优先级确认

当前定义的查找规则优先级为：

1. `同级目录/{id}.{ext}`
2. `同级目录/{id}/index.{ext}`  
3. `同级目录/_examples/{id}/{template}.{ext}`

这个优先级是否合适，或需要调整？

### 3. 编码可视化复杂度范围

确认支持的编码可视化复杂度：

- ✅ **简单转换**: UTF-8, ASCII, Base64 (字符级转换)
- ✅ **算法可视化**: 霍夫曼编码 (树形结构)
- ❓ **压缩算法**: LZ77, LZW 等 (是否需要支持？)
- ❓ **交互式输入**: 用户输入文本实时编码 (是否需要？)

### 4. 开发阶段优先级

考虑到技术复杂度，建议的开发优先级：

**Phase 1 (基础功能)**:

- 站点构建系统 + 基础 MDX 处理
- 简单的 @playground 注释处理
- CodeMirror 集成 (无 Deno)

**Phase 2 (核心功能)**:

- Deno WASM 集成
- 基础数据结构可视化 (2-3种类型)
- 简单编码可视化

**Phase 3 (高级功能)**:

- 完整 DSL 解析器
- 全部数据结构类型支持
- 高级交互功能

这个优先级规划是否合适？

### 5. 性能目标确认

基于静态部署的特点，确认性能目标：

- **首屏加载**: < 2秒 (包含基础代码编辑器)
- **可视化渲染**: < 500ms (中等复杂度数据结构)
- **代码执行**: < 1秒 (Deno WASM 初始化 + 运行)
- **内存占用**: < 100MB (浏览器端总内存)

这些指标是否现实可行？

## 总结

完善后的需求文档采用**配置化、类型安全、图灵完备**的设计理念，明确了所有关键技术决策：

### 核心技术决策

- 🔧 **配置驱动**: sites.config.ts 类型安全配置 + 独立站点构建系统
- 🎨 **简洁 DSL**: BNF 语法定义 + AntV G2 可视化引擎 + 图灵完备
- 📝 **注释机制**: @playground 在当前位置插入交互组件
- 🚀 **现代技术栈**: Vite 7.x + React 19 + TypeScript 严格模式
- ⚡ **沙箱执行**: Deno WASM + Worker 隔离 + 安全边界
- 📱 **全端适配**: 响应式设计 + 移动端手势 + 触摸优化

### 技术架构优势

- 🏗️ **模块化架构**: .sites/ 独立构建系统，可单独迁移和扩展
- 🔌 **插件生态**: 可扩展的插件架构，支持自定义功能模块
- 🎯 **性能优化**: Canvas 渲染 + Web Worker + 懒加载 + 代码分割
- 🛡️ **安全可靠**: 沙箱隔离 + 资源限制 + 错误边界 + 类型安全
- 🧪 **开发友好**: 热更新 + TypeScript 智能提示 + 组件化开发
- 💰 **零运维成本**: 静态部署 + CDN 加速 + GitHub Pages

### 实施保障

- **技术可行性**: 基于成熟的开源技术栈，风险可控
- **性能可达性**: 明确的性能指标和优化策略
- **开发可操作性**: 分阶段实施计划，逐步迭代完善
- **维护可持续性**: 类型安全 + 文档完善 + 代码规范

这个方案在技术先进性和实施可行性之间取得了很好的平衡，为算法学习平台提供了完整的技术解决方案。
