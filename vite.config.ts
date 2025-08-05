import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  // 插件配置
  plugins: [
    // MDX 插件 - 需要在 React 插件之前
    mdx({
      include: /\.(mdx?|md)$/, // 明确包含 .md 和 .mdx 文件
      remarkPlugins: [
        remarkFrontmatter, // 解析 YAML front matter
        remarkMdxFrontmatter, // 将 front matter 导出为 frontmatter 变量
        remarkMath,
        remarkGfm,
      ],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypeHighlight,
          {
            detect: true,
            subset: [
              'javascript',
              'typescript',
              'python',
              'java',
              'c',
              'cpp',
              'go',
              'rust',
              'html',
              'css',
              'json',
              'bash',
              'shell',
            ],
          },
        ],
      ],
      providerImportSource: '@mdx-js/react',
      // 移除 development 选项，使用默认配置
    }),
    react({
      // 支持 JSX 运行时
      jsxRuntime: 'automatic',
    }),
  ],

  // 路径解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/pages': resolve(__dirname, './src/pages'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/stores': resolve(__dirname, './src/stores'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/sites': resolve(__dirname, './.sites'),
    },
  },

  // 开发服务器配置
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    cors: true,
    hmr: {
      overlay: true,
    },
  },

  // GitHub Pages 部署配置
  base: process.env.NODE_ENV === 'production' ? '/learn-algorithm/' : '/',

  // 资源包含配置 - 移除 markdown 文件，让 MDX 插件处理
  assetsInclude: [
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.gif',
    '**/*.svg',
    '**/*.ico',
    '**/*.woff',
    '**/*.woff2',
  ],

  // 构建配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',

    // Terser 配置
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // Rollup 配置
    rollupOptions: {
      output: {
        // 手动代码分割
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          codemirror: [
            '@codemirror/view',
            '@codemirror/state',
            '@codemirror/lang-javascript',
            '@codemirror/lang-python',
            '@codemirror/theme-one-dark',
          ],
          visualization: [
            '@antv/g2',
            '@antv/g',
            '@antv/util',
            'd3',
            'framer-motion',
          ],
          math: ['katex'],
          utils: ['zustand', 'clsx', 'gray-matter', 'globby'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },

  // 依赖优化
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'clsx',
      'zustand',
      '@mdx-js/react',
      'katex',
    ],
    exclude: ['@deno/wasm'],
  },

  // CSS 配置
  css: {
    postcss: './postcss.config.ts',
    devSourcemap: true,
  },

  // 环境变量配置
  define: {
    __DEV__: process.env.NODE_ENV === 'development',
    __PROD__: process.env.NODE_ENV === 'production',
  },

  // 预览服务器配置
  preview: {
    port: 3000,
    host: '0.0.0.0',
    cors: true,
  },
})
