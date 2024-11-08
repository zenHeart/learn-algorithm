import type { SiteConfig } from '../types/config'
import { defaultConfig, mergeConfig } from './defaults'

/**
 * 配置验证函数
 */
function validateSiteConfig(config: Partial<SiteConfig>): void {
  const errors: string[] = []

  // 验证必填字段
  if (!config.site?.title) {
    errors.push('site.title is required')
  }

  if (!config.site?.description) {
    errors.push('site.description is required')
  }

  if (!config.site?.author) {
    errors.push('site.author is required')
  }

  if (!config.site?.url) {
    errors.push('site.url is required')
  }

  if (!config.site?.baseUrl) {
    errors.push('site.baseUrl is required')
  }

  // 验证导航配置
  if (config.nav && !Array.isArray(config.nav)) {
    errors.push('nav must be an array')
  }

  // 验证插件配置
  if (config.plugins) {
    if (!Array.isArray(config.plugins)) {
      errors.push('plugins must be an array')
    } else {
      config.plugins.forEach((plugin, index) => {
        if (!plugin.name) {
          errors.push(`plugins[${index}].name is required`)
        }
      })
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Configuration validation failed:\n${errors.map(e => `  - ${e}`).join('\n')}`
    )
  }
}

/**
 * 定义站点配置的函数
 * 提供类型安全和配置验证
 */
export function defineConfig(userConfig: Partial<SiteConfig>): SiteConfig {
  // 验证用户配置
  validateSiteConfig(userConfig)

  // 合并默认配置和用户配置
  const config = mergeConfig(defaultConfig, userConfig)

  // 处理环境变量
  const isDevelopment = process?.env?.NODE_ENV === 'development'
  const isProduction = process?.env?.NODE_ENV === 'production'

  // 环境特定的配置调整
  if (isDevelopment) {
    config.build.sourcemap = true
    config.build.minify = false
  }

  if (isProduction) {
    config.build.sourcemap = false
    config.build.minify = true
  }

  return config
}

/**
 * 类型安全的插件配置辅助函数
 */
export function definePlugin<T = Record<string, any>>(
  name: string,
  options?: T
) {
  return {
    name,
    options: options || {},
  }
}

/**
 * 类型安全的导航配置辅助函数
 */
export function defineNav(
  items: Array<{
    text: string
    link?: string
    children?: Array<{ text: string; link: string }>
  }>
): SiteConfig['nav'] {
  return items
}

/**
 * 类型安全的主题配置辅助函数
 */
export function defineTheme<T = Record<string, any>>(
  name: string,
  config?: T
): SiteConfig['theme'] {
  return {
    name,
    config: config || {},
  }
}
