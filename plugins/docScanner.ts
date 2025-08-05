import { Plugin } from 'vite'
import fs from 'fs'
import path from 'path'
import { compile } from '@mdx-js/mdx'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export interface DocItem {
  id: string
  title: string
  path: string
  category: string
  tags: string[]
  description: string
  frontmatter: Record<string, any>
  content: string // This will now hold compiled JS code
  playgrounds: PlaygroundItem[]
}

export interface PlaygroundItem {
  id: string
  mode: 'demo' | 'exercise' | 'test'
  initialCode: Record<string, string>
  solutionCode?: Record<string, string>
}

export interface SidebarItem {
  title: string
  path: string
  children?: SidebarItem[]
  frontmatter?: Record<string, any>
  sortWeight?: number
}

class DocScanner {
  private topicsDir: string
  private demosDir: string

  constructor() {
    // Correctly point to the 'docs' directory
    this.topicsDir = path.resolve(process.cwd(), 'docs')
    this.demosDir = '_demos'
  }

  private extractSortWeight(name: string): number {
    const match = name.match(/^(\d+)\./)
    return match ? parseInt(match[1], 10) : 9999
  }

  async scanAllDocs(): Promise<DocItem[]> {
    const docs: DocItem[] = []
    if (!fs.existsSync(this.topicsDir)) {
      console.warn('Docs directory not found:', this.topicsDir)
      return docs
    }
    await this.scanDirectory(this.topicsDir, '', docs)
    return docs
  }

  private async scanDirectory(
    dirPath: string,
    relativePath: string,
    docs: DocItem[]
  ): Promise<void> {
    const items = fs.readdirSync(dirPath, { withFileTypes: true })
    items.sort((a, b) => {
      const numA = this.extractSortWeight(a.name)
      const numB = this.extractSortWeight(b.name)
      if (numA !== numB) return numA - numB
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name)
      const itemRelativePath = path.join(relativePath, item.name)
      if (item.isDirectory()) {
        await this.scanDirectory(fullPath, itemRelativePath, docs)
      } else if (
        item.isFile() &&
        (item.name.endsWith('.mdx') || item.name.endsWith('.md'))
      ) {
        const doc = await this.processMdxFile(fullPath, itemRelativePath)
        if (doc) {
          docs.push(doc)
        }
      }
    }
  }

  private async processMdxFile(
    filePath: string,
    relativePath: string
  ): Promise<DocItem | null> {
    try {
      const rawContent = fs.readFileSync(filePath, 'utf-8')
      const frontmatter = this.extractFrontmatter(rawContent)
      const mdxContent = this.extractMdxContent(rawContent)

      // Build-time compilation of MDX content
      const compiledCode = await compile(mdxContent, {
        outputFormat: 'function-body',
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex],
        providerImportSource: '@mdx-js/react',
      })

      const docId = this.generateDocId(relativePath)
      const playgrounds = await this.scanPlaygrounds(filePath, docId)

      return {
        id: docId,
        title: frontmatter.title || this.generateTitle(relativePath),
        path: `/${relativePath.replace(/\.(mdx|md)$/, '').replace(/index$/, '')}`,
        category: frontmatter.category || this.extractCategory(relativePath),
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        description: frontmatter.description || '',
        frontmatter,
        content: String(compiledCode), // Store the compiled JS code
        playgrounds,
      }
    } catch (error) {
      console.error('Error processing MDX file:', filePath, error)
      return null
    }
  }

  private extractFrontmatter(content: string): Record<string, any> {
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
    if (!frontmatterMatch) return {}
    const frontmatterStr = frontmatterMatch[1]
    const frontmatter: Record<string, any> = {}
    frontmatterStr.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        let value: any = line.substring(colonIndex + 1).trim()
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value
            .slice(1, -1)
            .split(',')
            .map((v: string) => v.trim().replace(/['"]/g, ''))
        } else {
          value = value.replace(/['"]/g, '')
        }
        frontmatter[key] = value
      }
    })
    return frontmatter
  }

  private extractMdxContent(content: string): string {
    return content.replace(/^---\s*\n([\s\S]*?)\n---\s*\n/, '').trim()
  }

  private generateDocId(relativePath: string): string {
    return relativePath
      .replace(/\.(mdx|md)$/, '')
      .replace(/\\/g, '/')
      .replace(/index$/, '')
      .replace(/\/$/, '')
      .replace(/\//g, '-')
  }

  private generateTitle(relativePath: string): string {
    const fileName = path.basename(relativePath, path.extname(relativePath))
    if (fileName === 'index') {
      const parentDirName = path.basename(path.dirname(relativePath))
      return parentDirName
        .replace(/^\d+\./, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
    }
    return fileName
      .replace(/^\d+\./, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  private extractCategory(relativePath: string): string {
    const parts = relativePath.split(path.sep)
    return parts.length > 1 ? parts[0].replace(/^\d+\./, '') : 'general'
  }

  private async scanPlaygrounds(
    mdxPath: string,
    docId: string
  ): Promise<PlaygroundItem[]> {
    // Playground scanning logic can be added here if needed.
    return []
  }

  async generateSidebar(): Promise<SidebarItem[]> {
    const docs = await this.scanAllDocs()
    const root: { [key: string]: SidebarItem } = {}

    docs.forEach(doc => {
      const parts = doc.path.substring(1).split('/')
      let currentLevel = root
      let currentPath = ''

      parts.forEach((part, index) => {
        if (!part) return
        currentPath = `${currentPath}/${part}`
        const isLast = index === parts.length - 1

        if (!currentLevel[part]) {
          currentLevel[part] = {
            title: this.generateTitle(part),
            path: '',
            children: [],
            sortWeight: this.extractSortWeight(part),
          }
        }

        if (isLast) {
          currentLevel[part].path = doc.id
          currentLevel[part].title = doc.title
          currentLevel[part].frontmatter = doc.frontmatter
          delete currentLevel[part].children // It's a file link, no children
        } else {
          currentLevel = currentLevel[part].children as any
        }
      })
    })

    const sortItems = (items: any[]): SidebarItem[] => {
      return items
        .sort(
          (a, b) =>
            (a.sortWeight ?? 999) - (b.sortWeight ?? 999) ||
            a.title.localeCompare(b.title)
        )
        .map(item => {
          if (item.children && item.children.length > 0) {
            item.children = sortItems(Object.values(item.children))
          }
          return item
        })
    }

    return sortItems(Object.values(root))
  }
}

export function docScannerPlugin(): Plugin {
  const scanner = new DocScanner()
  const VIRTUAL_MODULE_ID = 'virtual:doc-data'
  const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

  async function generateVirtualModuleContent() {
    const docs = await scanner.scanAllDocs()
    const sidebar = await scanner.generateSidebar()

    const docsById = docs.reduce(
      (acc, doc) => {
        acc[doc.id] = doc
        return acc
      },
      {} as Record<string, DocItem>
    )

    return `
      export const allDocs = ${JSON.stringify(docsById)};
      export const sidebar = ${JSON.stringify(sidebar)};
    `
  }

  return {
    name: 'doc-scanner',
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },
    async load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return await generateVirtualModuleContent()
      }
    },
    configureServer(server) {
      const docsPath = path.resolve(process.cwd(), 'docs')
      server.watcher.add(docsPath)
      const handleChange = () => {
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('add', handleChange)
      server.watcher.on('change', handleChange)
      server.watcher.on('unlink', handleChange)
    },
  }
}
