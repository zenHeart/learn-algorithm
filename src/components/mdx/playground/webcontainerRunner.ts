// WebContainer 运行器（仅在支持的浏览器中可用）
// 说明：此模块负责将 fenced 配置对应的文件映射为 WebContainer FS，启动 node 进程运行并收集输出

import type { WebContainer, FileSystemTree } from '@webcontainer/api'
import type { PlaygroundFileItem, PlaygroundProps } from './Playground'

declare global {
  interface Window {
    WebContainer?: (typeof import('@webcontainer/api'))['WebContainer']
  }
}

export interface RunResult {
  supported: boolean
  stdout: string
  stderr: string
  error?: string
}

async function ensureWebContainer(): Promise<
  typeof import('@webcontainer/api') | null
> {
  try {
    const mod = await import('@webcontainer/api')
    return mod
  } catch (e) {
    return null
  }
}

function toFileTree(
  files: PlaygroundFileItem[],
  entry: string
): FileSystemTree {
  // 将相对路径映射为 webcontainer 的 /project 目录树
  const tree: FileSystemTree = {
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: 'playground-project',
          private: true,
          type: 'module',
          scripts: {
            start: `node ${entry}`,
          },
        }),
      },
    },
  }

  for (const f of files) {
    // 简单映射：将 './' 前缀去掉
    const clean = f.path.replace(/^\.\//, '')
    const segments = clean.split('/')
    let current: any = tree
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i]
      const isFile = i === segments.length - 1
      if (isFile) {
        // 内容将在外层加载后注入
        if (typeof s === 'string') {
          ;(current as Record<string, any>)[s] = { file: { contents: '' } }
        }
      } else {
        if (typeof s === 'string') {
          ;(current as Record<string, any>)[s] = (
            current as Record<string, any>
          )[s] || { directory: {} }
        }
        if (typeof s === 'string') {
          current = (current as Record<string, any>)[s].directory
        }
      }
    }
  }

  return tree
}

export async function runInWebContainer(
  config: PlaygroundProps,
  resolvedFiles: { path: string; contents: string }[]
): Promise<RunResult> {
  const api = await ensureWebContainer()
  if (!api) {
    return {
      supported: false,
      stdout: '',
      stderr: '',
      error: '当前环境不支持 WebContainer（需要现代浏览器与 HTTPS）',
    }
  }

  try {
    const { WebContainer } = api
    const webcontainer: WebContainer = await WebContainer.boot()

    const entry =
      config.entry ||
      (config.file ? config.file.replace(/^\.\//, '') : 'index.js')
    const fileItems: PlaygroundFileItem[] =
      config.files && config.files.length > 0
        ? config.files
        : config.file
          ? [{ path: config.file }]
          : [{ path: entry }]

    // 构建文件系统并写入内容
    const fsTree = toFileTree(fileItems, entry)
    await webcontainer.mount(fsTree)

    for (const f of resolvedFiles) {
      const clean = f.path.replace(/^\.\//, '')
      await webcontainer.fs.writeFile(clean, f.contents)
    }

    const install = await webcontainer.spawn('npm', ['init', '-y'])
    await install.exit

    const process = await webcontainer.spawn('npm', ['run', 'start'])
    const stdoutReader = process.output.getReader()

    let stdout = ''
    let stderr = ''
    const readAll = async () => {
      while (true) {
        const { value, done } = await stdoutReader.read()
        if (done) break
        stdout += value
      }
    }

    await Promise.race([
      readAll(),
      new Promise((_res, rej) =>
        setTimeout(() => rej(new Error('执行超时')), 15000)
      ),
    ])

    return { supported: true, stdout, stderr }
  } catch (e: any) {
    return {
      supported: true,
      stdout: '',
      stderr: '',
      error: e?.message || String(e),
    }
  }
}
