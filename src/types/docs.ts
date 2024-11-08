// 文档系统类型定义

export interface DocMeta {
  title: string
  description?: string
  difficulty?: 'simple' | 'medium' | 'hard'
  tags?: string[]
  date?: string
  author?: string
  category?: string
  weight?: number
  [key: string]: any
}

export interface DocItem {
  id: string
  title: string
  path: string
  fullPath: string
  meta?: DocMeta
  weight: number
  isDirectory: boolean
  children?: DocItem[]
}

export interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

export interface NavigationStructure {
  [moduleName: string]: SidebarItem[]
}

export interface DocRoute {
  path: string
  component: string
  meta: DocMeta
  filePath: string
}

export interface DocsConfig {
  docsDir: string
  routePrefix: string
  defaultMeta: Partial<DocMeta>
  sortBy: 'weight' | 'name' | 'date'
  sortOrder: 'asc' | 'desc'
}

export interface WeightCalculator {
  calculateWeight(dirName: string, fileName: string, index: number): number
}

export class DefaultWeightCalculator implements WeightCalculator {
  calculateWeight(dirName: string, fileName: string, index: number): number {
    const numberMatch = dirName.match(/^(\d+)\.?/)
    if (numberMatch) {
      return parseInt(numberMatch[1], 10)
    }
    
    const fileNumberMatch = fileName.match(/^(\d+)\.?/)
    if (fileNumberMatch) {
      return parseInt(fileNumberMatch[1], 10)
    }
    
    return 999 + index
  }
}
