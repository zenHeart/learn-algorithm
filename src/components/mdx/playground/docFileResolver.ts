// 文档文件解析器：基于 Vite 的 glob 原始内容映射，按当前路由推导文档基路径

const rawDocs: Record<string, () => string> = import.meta.glob('/docs/**/*', {
  as: 'raw',
  eager: true,
}) as any

function normalizeBase(base: string): string {
  if (!base) return '/'
  return base.endsWith('/') ? base : base + '/'
}

function joinPath(...parts: string[]): string {
  const joined = parts
    .filter(Boolean)
    .join('/')
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/')
  return joined.startsWith('/') ? joined : '/' + joined
}

function dirname(path: string): string {
  const idx = path.lastIndexOf('/')
  if (idx <= 0) return '/'
  return path.slice(0, idx)
}

// 从当前路由推断文档所在目录（与 ViteDocsLoader 的路由策略一致）
export function getCurrentDocDir(): string {
  const base = normalizeBase(import.meta.env.BASE_URL || '/')
  let pathname = window.location.pathname
  if (pathname.startsWith(base)) pathname = pathname.slice(base.length - 1)
  // pathname 例如: /algorithms/1.algorithm_complexity/bigO
  // 对应的文档前缀：/docs + pathname
  const docPath = '/docs' + pathname
  return dirname(docPath)
}

export function resolveDocFile(
  relativePath: string
): { path: string; contents: string } | null {
  const baseDir = getCurrentDocDir()
  const cleanRel = relativePath.replace(/^\.\//, '')
  const fullPath = joinPath(baseDir, cleanRel)
  const loader = rawDocs[fullPath]
  if (typeof loader === 'function') {
    return { path: relativePath, contents: loader() }
  }
  return null
}

export function resolveDocFiles(
  paths: string[]
): { path: string; contents: string }[] {
  const result: { path: string; contents: string }[] = []
  for (const p of paths) {
    const item = resolveDocFile(p)
    if (item) result.push(item)
  }
  return result
}

function isCodeFile(path: string): boolean {
  return /\.(jsx?|tsx?|json|css|txt)$/i.test(path)
}

// 列出相对当前文档目录的子目录文件（返回相对路径，如 './playground/App.jsx'）
export function listDocDirFiles(dirRel: string): string[] {
  const baseDir = getCurrentDocDir()
  const cleanRel = dirRel.replace(/^\.\//, '')
  const dirAbs = joinPath(baseDir, cleanRel)

  const paths: string[] = []
  for (const full of Object.keys(rawDocs)) {
    if (full.startsWith(dirAbs + '/')) {
      if (!isCodeFile(full)) continue
      const relFromBase = full.slice(baseDir.length)
      const rel = './' + relFromBase.replace(/^\//, '')
      paths.push(rel)
    }
  }

  paths.sort((a, b) => a.localeCompare(b))
  return paths
}
