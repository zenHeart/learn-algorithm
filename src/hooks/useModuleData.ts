import { useState, useEffect } from 'react'
import { useViteDocs } from '@/utils/viteDocsLoader'

export interface ModuleItem {
  id: string
  title: string
  description: string
  path: string
  weight: number
  icon?: string
  difficulty?: 'simple' | 'medium' | 'hard'
  tags?: string[]
  isFlattened?: boolean // 标识是否为扁平化项（直接指向文件而非目录）
  fileCount?: number // 目录下的文件数量，用于调试和显示
}

export function useModuleData(moduleName: string) {
  const [items, setItems] = useState<ModuleItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { loadModuleDocs, loadDocument } = useViteDocs()

  useEffect(() => {
    let isCancelled = false // 防止组件卸载后继续设置状态

    const loadModuleItems = async () => {
      if (isCancelled) return

      try {
        setLoading(true)
        setError(null)

        console.log(`🔍 Loading module data for: ${moduleName}`)

        // 获取模块下的所有文档
        const docs = await loadModuleDocs(moduleName)
        if (isCancelled) return

        console.log(
          `📁 Found ${docs.length} documents for ${moduleName}:`,
          docs
        )

        // 分析目录结构，支持扁平化导航
        const directoryAnalysis = new Map<
          string,
          {
            files: string[]
            weight: number
            hasIndexOrReadme: boolean
            indexFile?: string
          }
        >()

        // 分析每个一级子目录
        docs.forEach(doc => {
          const pathParts = doc.path.split('/').filter(Boolean)
          if (pathParts.length >= 2) {
            const firstLevelPath = `/${pathParts[0]}/${pathParts[1]}`
            const fileName = pathParts[pathParts.length - 1]

            if (!directoryAnalysis.has(firstLevelPath)) {
              directoryAnalysis.set(firstLevelPath, {
                files: [],
                weight: extractWeight(firstLevelPath),
                hasIndexOrReadme: false,
              })
            }

            const dirInfo = directoryAnalysis.get(firstLevelPath)!
            dirInfo.files.push(doc.path)

            // 检查是否为 index 或 README 文件
            if (fileName === 'index' || fileName === 'README') {
              dirInfo.hasIndexOrReadme = true
              dirInfo.indexFile = doc.path
            }
          }
        })

        console.log(
          `📂 Directory analysis:`,
          Array.from(directoryAnalysis.entries())
        )

        // 为每个目录生成卡片数据
        const moduleItems: ModuleItem[] = []

        for (const [dirPath, dirInfo] of directoryAnalysis) {
          if (isCancelled) return

          let title = extractTitleFromPath(dirPath)
          let description = getDefaultDescription(dirPath, moduleName)
          let weight = dirInfo.weight
          let difficulty: ModuleItem['difficulty'] = undefined
          let tags: string[] = []
          let isFlattened = false
          let actualPath = dirPath

          // 判断是否应该扁平化：只有一个文件且是 index.md 或 README.md
          const shouldFlatten =
            dirInfo.files.length === 1 &&
            dirInfo.hasIndexOrReadme &&
            dirInfo.indexFile

          if (shouldFlatten) {
            isFlattened = true
            actualPath = dirInfo.indexFile! // 指向实际的文件而非目录
            console.log(`🔧 Flattening ${dirPath} → ${actualPath}`)
          }

          // 尝试加载文档的元数据
          try {
            const targetPath = isFlattened ? actualPath : `${dirPath}/index`
            const doc = await loadDocument(targetPath, true) // 使用静默模式

            // 如果有文档，使用其元数据
            if (doc?.frontmatter) {
              const meta = doc.frontmatter
              title = meta.title || title
              description = meta.description || description
              weight = meta.weight || weight
              difficulty = meta.difficulty
              tags = meta.tags || []
            }
          } catch (docError) {
            // 静默处理文档加载失败，不影响主流程
            console.debug(`📝 No document for ${dirPath}, using defaults`)
          }

          if (isCancelled) return

          // 创建卡片项
          const moduleItem: ModuleItem = {
            id: dirPath.replace(/^\//, '').replace(/\//g, '-'),
            title,
            description,
            path: actualPath, // 使用实际路径（可能是文件路径）
            weight,
            tags,
            icon: getModuleIcon(dirPath, moduleName),
            isFlattened,
            fileCount: dirInfo.files.length,
          }

          // 只有当 difficulty 有值时才设置
          if (difficulty) {
            moduleItem.difficulty = difficulty
          }

          moduleItems.push(moduleItem)
        }

        if (isCancelled) return

        // 按权重排序
        moduleItems.sort((a, b) => a.weight - b.weight)

        console.log(
          `✅ Generated ${moduleItems.length} module items:`,
          moduleItems
        )
        setItems(moduleItems)
      } catch (err) {
        if (isCancelled) return
        console.error(`💥 Failed to load module data for ${moduleName}:`, err)
        setError(err instanceof Error ? err.message : '加载模块数据失败')
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    if (moduleName) {
      loadModuleItems()
    }

    // 清理函数
    return () => {
      isCancelled = true
    }
  }, [moduleName]) // 移除函数依赖，避免无限循环

  return { items, loading, error }
}

// 从路径提取标题
function extractTitleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  if (!lastSegment) {
    return 'Untitled'
  }

  return lastSegment
    .replace(/^\d+\.?\s*/, '') // 移除数字前缀
    .replace(/[-_]/g, ' ') // 替换连字符和下划线
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// 提取权重
function extractWeight(path: string): number {
  const segments = path.split('/').filter(Boolean)
  const lastSegment = segments[segments.length - 1]
  
  if (!lastSegment) {
    return 999
  }
  
  const numberMatch = lastSegment.match(/^(\d+)\.?/)

  if (numberMatch && numberMatch[1]) {
    return parseInt(numberMatch[1], 10)
  }

  return 999 // 无数字前缀的权重较低
}

// 获取默认描述
function getDefaultDescription(path: string, moduleName: string): string {
  const title = extractTitleFromPath(path)

  const descriptions: Record<string, Record<string, string>> = {
    algorithms: {
      'Algorithm Complexity': '深入理解时间复杂度和空间复杂度分析',
      Sort: '各种排序算法的原理和实现',
      Search: '搜索算法：线性搜索、二分搜索等',
      'Dynamic Programing': '动态规划解决复杂问题',
      'Divide And Conquer': '分治算法的思想和应用',
      'Sliding Window': '滑动窗口算法技巧',
      'Two Point': '双指针算法解题技巧',
      'Cache Replacement': '缓存替换算法的设计和实现',
      Gs: '贪心算法策略和应用',
    },
    'data-structures': {
      List: '线性数据结构：数组、链表等',
      Tree: '树形数据结构：二叉树、BST等',
      Graph: '图数据结构和图算法',
      String: '字符串处理和算法',
      Utils: '数据结构工具和辅助函数',
    },
    leetcode: {
      'Two Sum': '经典的两数之和问题',
      'Add Two Numbers': '链表加法运算',
      'Longest Substring': '最长子串问题',
    },
    math: {
      Logic: '数学逻辑基础',
      Sets: '集合论基础',
      Symbol: '数学符号和记号',
    },
    encode: {
      'Ieee754 2008': 'IEEE 754浮点数标准',
      'Utf 8': 'UTF-8编码原理',
    },
  }

  return descriptions[moduleName]?.[title] || `${title} 相关内容和实现`
}

// 获取模块图标
function getModuleIcon(path: string, moduleName: string): string {
  const title = extractTitleFromPath(path).toLowerCase()

  const icons: Record<string, Record<string, string>> = {
    algorithms: {
      'algorithm complexity': '⏱️',
      sort: '🔄',
      search: '🔍',
      'dynamic programing': '🧩',
      'divide and conquer': '⚡',
      'sliding window': '🪟',
      'two point': '👆',
      'cache replacement': '💾',
      gs: '🎯',
    },
    'data-structures': {
      list: '📝',
      tree: '🌳',
      graph: '🕸️',
      string: '🔤',
      utils: '🛠️',
    },
    leetcode: {
      'two sum': '➕',
      'add two numbers': '🔢',
      'longest substring': '📏',
    },
    math: {
      logic: '🧠',
      sets: '📐',
      symbol: '🔣',
    },
    encode: {
      'ieee754 2008': '🔢',
      'utf 8': '🔤',
    },
  }

  return icons[moduleName]?.[title] || '📄'
}
