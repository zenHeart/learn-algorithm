import { resolve } from 'node:path'
import type { SiteConfig } from '../types/config'

/**
 * 站点配置加载器
 */
export class SiteConfigLoader {
  private static instance: SiteConfigLoader
  private config: SiteConfig | null = null

  /**
   * 获取配置加载器实例
   */
  static getInstance(): SiteConfigLoader {
    if (!this.instance) {
      this.instance = new SiteConfigLoader()
    }
    return this.instance
  }

  /**
   * 加载站点配置
   */
  async load(configPath = 'sites.config.ts'): Promise<SiteConfig> {
    if (this.config) {
      return this.config
    }

    try {
      const fullPath = resolve(process.cwd(), configPath)

      // 动态导入 TypeScript 配置文件
      const configModule = await import(fullPath)
      const rawConfig = configModule.default || configModule

      if (!rawConfig || typeof rawConfig !== 'object') {
        throw new Error(`Invalid configuration in ${configPath}`)
      }

      this.config = rawConfig as SiteConfig
      return this.config
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Cannot resolve module')
      ) {
        // 配置文件不存在，返回默认配置
        console.warn(
          `Configuration file ${configPath} not found, using default config`
        )
        this.config = await this.getDefaultConfig()
        return this.config
      }
      throw new Error(`Failed to load configuration: ${error}`)
    }
  }

  /**
   * 获取默认配置
   */
  private async getDefaultConfig(): Promise<SiteConfig> {
    const { defineConfig } = await import('./defineConfig')
    return defineConfig({
      site: {
        title: '算法学习平台',
        description: '交互式算法与数据结构学习平台',
        author: '算法学习团队',
        url: 'http://blog.zenheart.site/learn-algorithm',
        baseUrl: '/learn-algorithm/',
      },
      nav: [
        { text: '首页', link: '/' },
        { text: '数据结构', link: '/data-structures' },
        { text: '算法', link: '/algorithms' },
        { text: '题目练习', link: '/leetcode' },
        { text: '数学基础', link: '/math' },
        { text: '编码原理', link: '/encode' },
        { text: '在线验证', link: '/playground' },
      ],
    })
  }

  /**
   * 重新加载配置 (用于开发环境热更新)
   */
  async reload(configPath = 'sites.config.ts'): Promise<SiteConfig> {
    this.config = null
    // 在 ES 模块中，动态导入会自动处理缓存
    // 为了强制重新加载，我们添加时间戳参数
    return this.load(configPath)
  }

  /**
   * 获取当前配置 (同步)
   */
  getConfig(): SiteConfig | null {
    return this.config
  }

  /**
   * 清空配置缓存
   */
  clear(): void {
    this.config = null
  }
}

/**
 * 全局配置加载器实例
 */
export const siteConfigLoader = SiteConfigLoader.getInstance()

/**
 * 便捷的配置加载函数
 */
export async function loadSiteConfig(configPath?: string): Promise<SiteConfig> {
  return siteConfigLoader.load(configPath)
}

/**
 * 便捷的配置重载函数
 */
export async function reloadSiteConfig(
  configPath?: string
): Promise<SiteConfig> {
  return siteConfigLoader.reload(configPath)
}
