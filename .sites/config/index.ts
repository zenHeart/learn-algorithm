/**
 * 站点配置系统统一导出
 */

// 类型定义
export type {
  SiteConfig,
  SiteInfo,
  NavItem,
  SidebarConfig,
  SidebarItem,
  ThemeConfig,
  PluginConfig,
  BuildConfig,
  MarkdownConfig,
  PWAConfig,
  SEOConfig
} from '../types/config'

// 配置定义函数
export {
  defineConfig,
  definePlugin,
  defineNav,
  defineTheme
} from './defineConfig'

// 配置加载器
export {
  SiteConfigLoader,
  siteConfigLoader,
  loadSiteConfig,
  reloadSiteConfig
} from './siteConfig'

// 默认配置
export {
  defaultConfig,
  mergeConfig
} from './defaults'

// 测试工具
export { testConfigSystem } from './test'
