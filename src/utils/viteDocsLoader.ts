// 基于 Vite 异步加载的文档系统
import type { SidebarItem, DocMeta } from '@/types/docs'

interface MDXModule {
  default: React.ComponentType
  frontmatter?: DocMeta
}

interface DocInfo {
  path: string
  module: () => Promise<MDXModule>
  title: string
  weight: number
}

export class ViteDocsLoader {
  private static instance: ViteDocsLoader
  private docsCache = new Map<string, DocInfo[]>()
  private navigationCache = new Map<string, SidebarItem[]>()
  // 预加载所有文档模块映射 - 导入默认导出（MDX 组件）
  private allModules = import.meta.glob('/docs/**/*.{md,mdx}', {
    eager: false,
    // 移除 import: 'default'，让 Vite 导入完整模块
  })

  static getInstance(): ViteDocsLoader {
    if (!ViteDocsLoader.instance) {
      ViteDocsLoader.instance = new ViteDocsLoader()
    }
    return ViteDocsLoader.instance
  }

  /**
   * 使用 Vite glob import 加载指定模块的所有文档
   */
  async loadModuleDocs(moduleName: string): Promise<DocInfo[]> {
    // 检查缓存
    if (this.docsCache.has(moduleName)) {
      return this.docsCache.get(moduleName)!
    }

    let docs: DocInfo[] = []

    try {
      // 过滤出当前模块的文档
      const modulePattern = new RegExp(`^/docs/${moduleName}/`)

      for (const [filePath, moduleLoader] of Object.entries(this.allModules)) {
        if (modulePattern.test(filePath)) {
          // 提取相对路径 (移除 /docs 前缀和文件扩展名)
          const relativePath = filePath
            .replace(/^\/docs/, '')
            .replace(/\.(md|mdx)$/, '')

          // 计算权重和标题
          const weight = this.calculateWeight(relativePath)
          const title = this.extractTitle(relativePath)

          docs.push({
            path: relativePath,
            module: moduleLoader as () => Promise<MDXModule>,
            title,
            weight,
          })
        }
      }

      // 按权重排序
      docs.sort((a, b) => {
        if (a.weight !== b.weight) {
          return a.weight - b.weight
        }
        return a.path.localeCompare(b.path)
      })

      // 缓存结果
      this.docsCache.set(moduleName, docs)
    } catch (error) {
      console.error(`Failed to load docs for module ${moduleName}:`, error)
    }

    return docs
  }

  /**
   * 生成模块的导航结构
   */
  async generateModuleNavigation(moduleName: string): Promise<SidebarItem[]> {
    // 检查缓存
    if (this.navigationCache.has(moduleName)) {
      return this.navigationCache.get(moduleName)!
    }

    const docs = await this.loadModuleDocs(moduleName)
    const navigation = this.buildNavigationTree(docs)

    // 缓存结果
    this.navigationCache.set(moduleName, navigation)
    return navigation
  }

  /**
   * 异步加载单个文档
   */
  async loadDocument(
    docPath: string,
    silent = false
  ): Promise<MDXModule | null> {
    try {
      // 标准化路径
      let cleanPath = docPath.startsWith('/') ? docPath : `/${docPath}`

      // 处理 /index 后缀 - 如果路径以 /index 结尾，移除它
      if (cleanPath.endsWith('/index')) {
        cleanPath = cleanPath.replace('/index', '')
      }

      // 尝试不同的文件扩展名对应的实际文件路径
      const possiblePaths = [
        `/docs${cleanPath}.mdx`,
        `/docs${cleanPath}.md`,
        `/docs${cleanPath}/index.mdx`,
        `/docs${cleanPath}/index.md`,
      ]

      if (!silent) {
        console.log('🔍 Trying to load document:', docPath)
        console.log('🧹 Cleaned path:', cleanPath)
        console.log('🎯 Possible file paths:', possiblePaths)
      }

      for (const path of possiblePaths) {
        if (this.allModules[path]) {
          if (!silent) {
            console.log('✅ Found module for path:', path)
          }
          try {
            // 使用预加载的模块映射
            const moduleLoader = this.allModules[path]
            const module = await moduleLoader()

            // 检查模块结构 - MDX 模块应该有 default 导出
            if (module && typeof module === 'object') {
              if ('default' in module) {
                const component = module.default

                // MDX 组件是函数类型
                if (typeof component === 'function') {
                  if (!silent) {
                    console.log('✅ Successfully loaded document:', docPath)
                  }
                  return {
                    default: component as React.ComponentType,
                    frontmatter: (module as any)?.frontmatter || {},
                  } as MDXModule
                } else {
                  if (!silent) {
                    console.warn(
                      '⚠️ Default export is not a function:',
                      typeof component,
                      component
                    )
                  }
                }
              } else {
                if (!silent) {
                  console.error('❌ Module has no default export')
                  console.error('Available exports:', Object.keys(module))
                }
              }
            } else {
              if (!silent) {
                console.error(
                  '❌ Invalid module structure:',
                  typeof module,
                  module
                )
              }
            }
            continue
          } catch (loadError) {
            if (!silent) {
              console.error(
                '❌ Failed to load module at path:',
                path,
                loadError
              )
            }
            continue
          }
        }
      }

      // 只在非静默模式下输出调试信息
      if (!silent) {
        console.warn(`❌ Document not found: ${docPath}`)
        console.log('💡 Available paths for debugging:')
        const pathSegments = cleanPath.split('/')
        const moduleSegment = pathSegments[1]
        if (moduleSegment) {
          Object.keys(this.allModules).forEach(path => {
            if (path.includes(moduleSegment)) {
              console.log('  -', path)
            }
          })
        }
      }

      return null
    } catch (error) {
      if (!silent) {
        console.error(`💥 Failed to load document ${docPath}:`, error)
      }
      return null
    }
  }

  /**
   * 获取文档的元数据（通过加载模块获取）
   */
  async getDocumentMeta(docPath: string): Promise<DocMeta | null> {
    try {
      const module = await this.loadDocument(docPath)
      return module?.frontmatter || null
    } catch (error) {
      console.error(`Failed to get meta for ${docPath}:`, error)
      return null
    }
  }

  /**
   * 计算路径权重
   */
  private calculateWeight(path: string): number {
    const segments = path.split('/').filter(Boolean)
    let weight = 0

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]
      if (!segment) continue

      const numberMatch = segment.match(/^(\d+)\.?/)

      if (numberMatch && numberMatch[1]) {
        // 数字前缀的权重
        weight +=
          parseInt(numberMatch[1], 10) * Math.pow(1000, segments.length - i - 1)
      } else if (segment === 'index') {
        // index 文件权重最高
        weight -= 1000
      } else {
        // 无数字前缀的权重较低
        weight += 999 * Math.pow(1000, segments.length - i - 1)
      }
    }

    return weight
  }

  /**
   * 从路径提取标题
   */
  private extractTitle(path: string): string {
    const segments = path.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]

    if (!lastSegment) {
      return 'Home'
    }

    if (lastSegment === 'index') {
      // 如果是 index，使用父目录名
      const parentSegment = segments[segments.length - 2]
      return this.formatTitle(parentSegment || 'Home')
    }

    return this.formatTitle(lastSegment)
  }

  /**
   * 构建导航树结构
   */
  private buildNavigationTree(docs: DocInfo[]): SidebarItem[] {
    const tree = new Map<string, any>()

    // 按路径层级组织文档
    for (const doc of docs) {
      const pathParts = doc.path.split('/').filter(Boolean)
      let currentLevel = tree

      // 跳过模块名，从第二级开始
      for (let i = 1; i < pathParts.length; i++) {
        const part = pathParts[i]
        if (!part) continue

        const isLast = i === pathParts.length - 1

        if (!currentLevel.has(part)) {
          currentLevel.set(part, {
            items: new Map(),
            docs: [],
            isDirectory: !isLast || part === 'index',
          })
        }

        // 添加文档到当前层级
        if (isLast) {
          currentLevel.get(part)!.docs.push(doc)
        }

        currentLevel = currentLevel.get(part)!.items
      }
    }

    return this.convertMapToSidebar(tree)
  }

  /**
   * 转换 Map 结构为 SidebarItem 数组
   */
  private convertMapToSidebar(map: Map<string, any>): SidebarItem[] {
    const items: SidebarItem[] = []

    for (const [key, value] of map.entries()) {
      const item: SidebarItem = {
        text: this.formatTitle(key),
        collapsed: false,
      }

      // 扁平化逻辑：如果只有一个文档（index 或 README），直接使用它，不创建嵌套结构
      if (value.docs.length === 1) {
        const doc = value.docs[0]
        const fileName = doc.path.split('/').pop() || ''

        // 只有单个 index 或 README 文件时，直接扁平化
        if (fileName === 'index' || fileName === 'README') {
          item.link = doc.path
          // 保持目录名称作为标题，不使用文件标题
          // item.text 已经在第317行通过 this.formatTitle(key) 设置为正确的目录名
        } else {
          // 如果是其他单个文件，使用文件标题
          item.link = doc.path
          item.text = doc.title
        }
      } else {
        // 多个文档时，查找 index 文档作为目录链接
        const indexDoc = value.docs.find(
          (doc: DocInfo) =>
            doc.path.endsWith('/index') || doc.path.endsWith(`/${key}`)
        )

        if (indexDoc) {
          item.link = indexDoc.path
          item.text = indexDoc.title
        }

        // 添加其他文档作为子项
        const nonIndexDocs = value.docs.filter(
          (doc: DocInfo) => !doc.path.endsWith('/index') && doc !== indexDoc
        )

        if (nonIndexDocs.length > 0) {
          if (!item.items) item.items = []
          item.items.push(
            ...nonIndexDocs.map((doc: DocInfo) => ({
              text: doc.title,
              link: doc.path,
              collapsed: false,
            }))
          )
        }
      }

      // 如果有子目录，递归处理
      if (value.items.size > 0) {
        const subItems = this.convertMapToSidebar(value.items)
        if (!item.items) item.items = []
        item.items.push(...subItems)
      }

      // 扁平化优化：如果当前项只有一个子项且自己没有直接链接，则提升子项
      if (!item.link && item.items && item.items.length === 1) {
        const singleChild = item.items[0]
        // 如果子项也是单一文件，则直接使用子项，避免多层嵌套
        if (
          singleChild &&
          singleChild.link &&
          (!singleChild.items || singleChild.items.length === 0)
        ) {
          item.link = singleChild.link

          // 检查子项是否是 index/README 类型的文件
          const childPath = singleChild.link || ''
          const fileName = childPath.split('/').pop() || ''

          // 如果是 index 或 README 文件，保持父级目录名称
          if (fileName === 'index' || fileName === 'README') {
            // 保持 item.text 不变（即目录名称）
          } else {
            // 如果是其他文件，使用子项的标题
            item.text = singleChild.text
          }

          delete item.items // 移除子项，直接扁平化
        }
      }

      items.push(item)
    }

    return items
  }

  /**
   * 格式化标题
   */
  private formatTitle(pathSegment: string): string {
    return pathSegment
      .replace(/^\d+\.?\s*/, '') // 移除数字前缀
      .replace(/[-_]/g, ' ') // 替换连字符和下划线
      .replace(/\b\w/g, l => l.toUpperCase()) // 首字母大写
  }

  /**
   * 清除缓存
   */
  clearCache(moduleName?: string): void {
    if (moduleName) {
      this.docsCache.delete(moduleName)
      this.navigationCache.delete(moduleName)
    } else {
      this.docsCache.clear()
      this.navigationCache.clear()
    }
  }

  /**
   * 获取相邻页面
   */
  async getAdjacentPages(
    moduleName: string,
    currentPath: string
  ): Promise<{
    prev: DocInfo | null
    next: DocInfo | null
  }> {
    const docs = await this.loadModuleDocs(moduleName)
    const currentIndex = docs.findIndex(doc => doc.path === currentPath)

    return {
      prev: currentIndex > 0 ? docs[currentIndex - 1] || null : null,
      next:
        currentIndex < docs.length - 1 ? docs[currentIndex + 1] || null : null,
    }
  }

  /**
   * 获取所有可用的文档路径
   */
  getAllDocumentPaths(): string[] {
    return Object.keys(this.allModules).map(path =>
      path.replace(/^\/docs/, '').replace(/\.(md|mdx)$/, '')
    )
  }
}

// 导出单例实例
export const viteDocsLoader = ViteDocsLoader.getInstance()

// React Hook
export function useViteDocs() {
  return {
    loadModuleDocs: (moduleName: string) =>
      viteDocsLoader.loadModuleDocs(moduleName),
    generateNavigation: (moduleName: string) =>
      viteDocsLoader.generateModuleNavigation(moduleName),
    loadDocument: (docPath: string, silent?: boolean) =>
      viteDocsLoader.loadDocument(docPath, silent),
    getDocumentMeta: (docPath: string) =>
      viteDocsLoader.getDocumentMeta(docPath),
    getAdjacentPages: (moduleName: string, currentPath: string) =>
      viteDocsLoader.getAdjacentPages(moduleName, currentPath),
    clearCache: (moduleName?: string) => viteDocsLoader.clearCache(moduleName),
    getAllDocumentPaths: () => viteDocsLoader.getAllDocumentPaths(),
  }
}
