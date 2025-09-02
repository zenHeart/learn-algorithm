import type {
  PlaygroundProps,
  PlaygroundFileItem,
  PlaygroundOptions,
} from './Playground'

// 将字符串去除首尾引号
function trimQuotes(input: string): string {
  const s = input.trim()
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1)
  }
  return s
}

// 解析布尔/数字/字符串
function parseScalar(value: string): string | boolean | number {
  const v = value.trim()
  if (/^(true|false)$/i.test(v)) return v.toLowerCase() === 'true'
  if (/^\d+(?:\.\d+)?$/.test(v)) return Number(v)
  return trimQuotes(v)
}

/**
 * 轻量 YAML 子集解析器
 * 支持键：file, dir, files, entry, template, title, options
 * - files: 列表支持两种：
 *   - "- ./path"
 *   - "- './path':" 后跟缩进行：hidden/active
 * - options: 简单 k:v（布尔/字符串）
 */
export function parsePlaygroundConfig(code: string): PlaygroundProps {
  const lines = code.split(/\r?\n/)
  const result: PlaygroundProps = {}
  const files: PlaygroundFileItem[] = []
  const options: PlaygroundOptions = {}

  let i = 0
  let inFiles = false
  let inOptions = false

  while (i < lines.length) {
    const raw = lines[i]
    const line = raw.replace(/\t/g, '    ')
    const trimmed = line.trim()
    i++

    if (!trimmed || trimmed.startsWith('#')) continue

    // 顶层 keys
    if (!line.startsWith(' ') && !line.startsWith('  ')) {
      inFiles = false
      inOptions = false

      const m = trimmed.match(/^(\w+):\s*(.*)$/)
      if (!m) continue
      const key = m[1]
      const value = m[2] ?? ''

      if (key === 'files') {
        inFiles = true
        continue
      }
      if (key === 'options') {
        inOptions = true
        continue
      }
      if (key === 'file') {
        result.file = trimQuotes(value)
        continue
      }
      if (key === 'dir') {
        result.dir = trimQuotes(value)
        continue
      }
      if (key === 'entry') {
        result.entry = trimQuotes(value)
        continue
      }
      if (key === 'template') {
        result.template = trimQuotes(value)
        continue
      }
      if (key === 'title') {
        result.title = trimQuotes(value)
        continue
      }
      // 未识别顶层键，跳过
      continue
    }

    // files 列表解析
    if (inFiles) {
      const itemMatch = trimmed.match(/^-(\s+)(.+)$/)
      if (itemMatch) {
        const afterDash = itemMatch[2].trim()
        // 形如: '- "./path"' 或 '- ./path'
        if (!afterDash.endsWith(':')) {
          files.push({ path: trimQuotes(afterDash) })
          continue
        }

        // 形如: '- "./path":'，后跟缩进行属性
        const filePath = trimQuotes(afterDash.slice(0, -1))
        const item: PlaygroundFileItem = { path: filePath }

        // 消费随后的缩进行（属性）
        while (i < lines.length) {
          const propRaw = lines[i]
          const propLine = propRaw.replace(/\t/g, '    ')
          const propTrim = propLine.trim()
          if (!propLine.startsWith('    ') && !propLine.startsWith('  ')) break
          i++
          if (!propTrim) continue
          const kv = propTrim.match(/^(\w+):\s*(.*)$/)
          if (!kv) continue
          const k = kv[1]
          const v = parseScalar(kv[2] || '')
          if (k === 'hidden' && typeof v === 'boolean') item.hidden = v
          if (k === 'active' && typeof v === 'boolean') item.active = v
        }

        files.push(item)
        continue
      }
      // 非 "- " 开头，视为离开 files 区域
      inFiles = false
    }

    // options 解析（缩进行）
    if (inOptions) {
      if (!line.startsWith(' ') && !line.startsWith('  ')) {
        inOptions = false
        continue
      }
      const kv = trimmed.match(/^(\w+):\s*(.*)$/)
      if (!kv) continue
      const k = kv[1]
      const v = parseScalar(kv[2] || '')
      ;(options as any)[k] = v
    }
  }

  if (files.length > 0) result.files = files
  if (Object.keys(options).length > 0) result.options = options
  // 默认回退：如果未指定 file/dir/files，则默认查找当前文档目录下的 ./playground
  if (
    !result.file &&
    !result.dir &&
    (!result.files || result.files.length === 0)
  ) {
    result.dir = './playground'
  }
  return result
}
