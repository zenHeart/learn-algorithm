/// <reference types="vite/client" />
/// <reference types="react/canary" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 添加更多环境变量类型...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// React 19 类型增强
declare module 'react' {
  // 支持 React 19 的新 hooks 和特性
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // 支持自定义属性
    [key: `data-${string}`]: string | undefined
  }
}

// 全局类型声明
declare global {
  const __DEV__: boolean
  const __PROD__: boolean
}

// MDX 类型支持
declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const Component: ComponentType
  export default Component

  // 添加 frontmatter 导出
  export const frontmatter: Record<string, any>
}

declare module '*.md' {
  import type { ComponentType } from 'react'
  const Component: ComponentType
  export default Component

  // 添加 frontmatter 导出
  export const frontmatter: Record<string, any>
}

// 确保这是一个模块
export {}
