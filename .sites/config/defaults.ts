import type { SiteConfig } from '../types/config'

/**
 * 默认站点配置
 */
export const defaultConfig: Partial<SiteConfig> = {
  site: {
    title: '',
    description: '',
    author: '',
    url: '',
    baseUrl: '/',
    lang: 'zh-CN',
    favicon: '/favicon.ico',
  },

  nav: [],

  sidebar: {
    auto: true,
    customization: {},
  },

  theme: {
    name: 'default',
    config: {
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
      },
    },
  },

  plugins: [],

  build: {
    outputDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: true,
  },

  markdown: {
    lineNumbers: false,
    anchor: {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '¶',
    },
    toc: {
      includeLevel: [2, 3, 4],
    },
    codeHighlight: {
      theme: 'github-dark',
      lineNumbers: true,
    },
  },

  pwa: {
    enabled: false,
    manifest: {
      name: '',
      short_name: '',
      description: '',
      theme_color: '#3b82f6',
      background_color: '#ffffff',
    },
  },

  seo: {
    meta: {
      keywords: [],
      author: '',
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      image: '/og-image.png',
    },
  },
}

/**
 * 深度合并配置对象
 */
export function mergeConfig(
  defaultConfig: Partial<SiteConfig>,
  userConfig: Partial<SiteConfig>
): SiteConfig {
  const result = { ...defaultConfig } as SiteConfig

  for (const key in userConfig) {
    const userValue = userConfig[key as keyof SiteConfig]
    const defaultValue = result[key as keyof SiteConfig]

    if (userValue === undefined) {
      continue
    }

    if (
      typeof userValue === 'object' &&
      userValue !== null &&
      !Array.isArray(userValue) &&
      typeof defaultValue === 'object' &&
      defaultValue !== null &&
      !Array.isArray(defaultValue)
    ) {
      // 递归合并对象
      result[key as keyof SiteConfig] = {
        ...defaultValue,
        ...userValue,
      } as any
    } else {
      // 直接覆盖
      result[key as keyof SiteConfig] = userValue as any
    }
  }

  return result
}
