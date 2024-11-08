import { defineConfig, defineNav, defineTheme, definePlugin } from './.sites/config/defineConfig'

export default defineConfig({
  // 站点基础信息
  site: {
    title: "算法学习平台",
    description: "交互式算法与数据结构学习平台",
    author: "算法学习团队",
    url: "http://blog.zenheart.site/learn-algorithm",
    baseUrl: "/learn-algorithm/",
    favicon: "/logo.svg",
    lang: "zh-CN"
  },
  
  // 导航配置
  nav: defineNav([
    { text: "首页", link: "/" },
    { text: "数据结构", link: "/data-structures" },
    { text: "算法", link: "/algorithms" },
    { text: "题目练习", link: "/leetcode" },
    { text: "数学基础", link: "/math" },
    { text: "编码原理", link: "/encode" },
    { text: "在线验证", link: "/playground" }
  ]),

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
  theme: defineTheme("algorithm-learning", {
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
  }),

  // 插件配置
  plugins: [
    definePlugin("@algorithm-learning/plugin-playground", {
      templates: ["demo", "exercise", "test", "data-structure", "encode"],
      defaultLanguage: "javascript",
      supportedLanguages: ["javascript", "python", "java", "cpp"]
    }),
    
    definePlugin("@algorithm-learning/plugin-visualization", {
      dataStructures: ["binary-tree", "graph", "array", "linked-list"],
      encoding: ["utf8", "ascii", "huffman", "base64"],
      animation: {
        defaultSpeed: "normal",
        enableControls: true
      }
    }),
    
    definePlugin("@algorithm-learning/plugin-math", {
      katex: {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      }
    })
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
