/**
 * 站点配置系统类型定义
 */

export interface SiteInfo {
  /** 网站标题 */
  title: string
  /** 网站描述 */
  description: string
  /** 作者信息 */
  author: string
  /** 网站完整 URL */
  url: string
  /** 基础路径 (用于子路径部署) */
  baseUrl: string
  /** 网站图标路径 */
  favicon?: string
  /** 网站语言 */
  lang?: string
}

export interface NavItem {
  /** 导航文本 */
  text: string
  /** 导航链接 */
  link?: string
  /** 子导航 */
  children?: NavItem[]
  /** 激活匹配规则 */
  activeMatch?: string
}

export interface SidebarConfig {
  /** 是否自动生成侧边栏 */
  auto: boolean
  /** 自定义侧边栏配置 */
  customization?: Record<string, SidebarItem[]>
}

export interface SidebarItem {
  /** 显示文本 */
  text: string
  /** 链接地址 */
  link?: string
  /** 子项目 */
  children?: SidebarItem[]
  /** 是否可折叠 */
  collapsible?: boolean
  /** 默认是否展开 */
  collapsed?: boolean
}

export interface ThemeConfig {
  /** 主题名称 */
  name: string
  /** 主题配置 */
  config?: Record<string, any>
}

export interface PluginConfig {
  /** 插件名称 */
  name: string
  /** 插件配置选项 */
  options?: Record<string, any>
}

export interface BuildConfig {
  /** 输出目录 */
  outputDir: string
  /** 资源目录 */
  assetsDir: string
  /** 是否生成 sourcemap */
  sourcemap: boolean
  /** 是否压缩 */
  minify: boolean
}

export interface MarkdownConfig {
  /** 是否显示行号 */
  lineNumbers: boolean
  /** 锚点配置 */
  anchor: {
    /** 是否显示永久链接 */
    permalink: boolean
    /** 永久链接位置 */
    permalinkBefore: boolean
    /** 永久链接符号 */
    permalinkSymbol: string
  }
  /** 目录配置 */
  toc: {
    /** 包含的标题级别 */
    includeLevel: number[]
  }
  /** 代码高亮配置 */
  codeHighlight: {
    /** 主题 */
    theme: string
    /** 是否显示行号 */
    lineNumbers: boolean
  }
}

export interface PWAConfig {
  /** 是否启用 PWA */
  enabled: boolean
  /** manifest 配置 */
  manifest: {
    name: string
    short_name: string
    description: string
    theme_color: string
    background_color: string
  }
}

export interface SEOConfig {
  /** meta 标签配置 */
  meta: {
    keywords: string[]
    author: string
  }
  /** Open Graph 配置 */
  openGraph: {
    type: string
    locale: string
    image: string
  }
}

/**
 * 完整的站点配置接口
 */
export interface SiteConfig {
  /** 站点基础信息 */
  site: SiteInfo
  /** 导航配置 */
  nav: NavItem[]
  /** 侧边栏配置 */
  sidebar: SidebarConfig
  /** 主题配置 */
  theme: ThemeConfig
  /** 插件配置 */
  plugins: PluginConfig[]
  /** 构建配置 */
  build: BuildConfig
  /** Markdown 配置 */
  markdown: MarkdownConfig
  /** PWA 配置 */
  pwa?: PWAConfig
  /** SEO 配置 */
  seo?: SEOConfig
}
