import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { runInWebContainer } from './webcontainerRunner'
import { listDocDirFiles, resolveDocFiles } from './docFileResolver'
import { CodeEditor } from './CodeEditor'

// Playground 组件的 Props 类型定义
export interface PlaygroundFileItem {
  path: string
  hidden?: boolean
  active?: boolean
}

export interface PlaygroundOptions {
  runOnLoad?: boolean
  editable?: boolean
  sandbox?: boolean
}

export interface PlaygroundProps {
  file?: string
  dir?: string
  files?: PlaygroundFileItem[]
  entry?: string
  template?: string
  title?: string
  options?: PlaygroundOptions
}

/**
 * 基础 Playground 渲染组件
 * 说明：当前为占位实现，用于验证 fenced 语法解析与注入流程
 * 后续会接入 CodeMirror、运行时（WASM/Worker）与可视化能力
 */
export function Playground(props: PlaygroundProps) {
  const { title, template, entry, file, dir, files = [], options = {} } = props
  const [running, setRunning] = useState(false)
  const [stdout, setStdout] = useState('')
  const [stderr, setStderr] = useState('')
  const [error, setError] = useState<string | undefined>()

  // 初始文件集合：优先 files，其次 file；否则列出默认目录 ./playground 下文件；最后回退 entry
  const initialFileList = useMemo(() => {
    if (files.length > 0) return files.map(f => ({ ...f }))
    if (file) return [{ path: file }]
    const dirFiles = listDocDirFiles(dir || './playground')
    if (dirFiles.length > 0) return dirFiles.map(p => ({ path: p }))
    if (entry) return [{ path: `./${entry}` }]
    return []
  }, [files, file, entry, dir])

  const [openFiles, setOpenFiles] = useState(initialFileList)
  const [activePath, setActivePath] = useState<string | undefined>(
    () => initialFileList.find(f => f.active)?.path || initialFileList[0]?.path
  )
  const [fileContents, setFileContents] = useState<Record<string, string>>({})
  const showHeader = false
  const debounceRef = useRef<number | undefined>(undefined)
  const isSingleFile = openFiles.length <= 1

  const loadFileContents = useCallback(async () => {
    const paths = openFiles.map(f => f.path)
    const resolved = resolveDocFiles(paths)
    const missing = paths.filter(p => !resolved.find(r => r.path === p))
    const filled = resolved.concat(
      missing.map(p => ({ path: p, contents: `console.log('未能加载: ${p}')` }))
    )
    return filled
  }, [openFiles])

  const handleRun = useCallback(async () => {
    setRunning(true)
    setStdout('')
    setStderr('')
    setError(undefined)
    try {
      const resolved = await loadFileContents()
      const merged = resolved.map(item => ({
        path: item.path,
        contents: fileContents[item.path] ?? item.contents,
      }))
      const result = await runInWebContainer(props, merged)
      setStdout(result.stdout)
      setStderr(result.stderr)
      setError(result.error)
    } catch (e: any) {
      setError(e?.message || String(e))
    } finally {
      setRunning(false)
    }
  }, [loadFileContents, props, fileContents])

  // 加载初始文件内容到编辑器状态
  useEffect(() => {
    ;(async () => {
      const filesData = await loadFileContents()
      setFileContents(prev => {
        const next = { ...prev }
        for (const f of filesData) {
          if (!(f.path in next)) next[f.path] = f.contents
        }
        return next
      })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 自动运行：当配置开启且有可运行文件
  useEffect(() => {
    if (options.runOnLoad && openFiles.length > 0) {
      // 避免重复触发
      handleRun()
    }
    // 仅在初次渲染时根据 options 判断
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='my-2'>
      {/* 头部（已隐藏，保留结构以便后续启用） */}
      {showHeader && (
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex h-9 w-9 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'>
              ⚗️
            </div>
            <div>
              <div className='text-base font-semibold text-gray-900 dark:text-white'>
                {title || '交互示例'}
              </div>
              <div className='text-xs text-gray-600 dark:text-gray-300'>
                模板: {template || '自动推断'} {entry ? `· 入口: ${entry}` : ''}
              </div>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            {options.runOnLoad && (
              <span className='rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800 dark:bg-green-900 dark:text-green-300'>
                启动即运行
              </span>
            )}
            {options.editable !== false && (
              <span className='rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300'>
                可编辑
              </span>
            )}
            {options.sandbox !== false && (
              <span className='rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'>
                沙箱
              </span>
            )}
          </div>
        </div>
      )}

      {/* 顶部来源信息已移除 */}

      {/* 文件列表（预览） - 已移除冗余显示 */}

      {/* 顶部操作区已移除，采用自动运行与悬浮按钮 */}

      {/* 编辑器（左） + 输出（右） 布局；移动端自动折行 */}
      <div className='mt-2 grid grid-cols-1 gap-0 md:grid-cols-2'>
        {/* 左侧：文件标签 + 编辑器（单文件隐藏标签） */}
        <div className='flex min-h-[420px] flex-col'>
          {!isSingleFile && (
            <div className='flex flex-nowrap gap-0 overflow-x-auto border-b border-gray-200 p-0 whitespace-nowrap dark:border-gray-700'>
              {openFiles.map(f => (
                <button
                  key={f.path}
                  onClick={() => setActivePath(f.path)}
                  className={`rounded-none px-3 py-2 text-xs ${
                    activePath === f.path
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                  }`}
                  title={f.path}
                >
                  {f.path.replace(/^\.\//, '')}
                </button>
              ))}
            </div>
          )}
          {/* 编辑器区域 */}
          <div className='min-h-0 flex-1 p-0'>
            <CodeEditor
              value={activePath ? (fileContents[activePath] ?? '') : ''}
              language={'javascript'}
              readOnly={options.editable === false}
              onChange={next => {
                if (!activePath) return
                setFileContents(prev => ({ ...prev, [activePath]: next }))
                if (debounceRef.current) {
                  window.clearTimeout(debounceRef.current)
                }
                debounceRef.current = window.setTimeout(() => {
                  if (!running) handleRun()
                }, 600)
              }}
            />
          </div>
        </div>

        {/* 右侧：输出区（单文件合并显示） */}
        <div className='relative min-h-[420px] rounded-md border border-gray-200 p-2 text-sm dark:border-gray-700'>
          {isSingleFile ? (
            <>
              <div className='mb-2 font-medium text-gray-800 dark:text-gray-200'>
                输出
              </div>
              <pre className='max-h-96 overflow-auto whitespace-pre-wrap text-gray-800 dark:text-gray-200'>
                {error
                  ? `错误: ${error}`
                  : stderr
                    ? `错误: ${stderr}`
                    : stdout || '（暂无输出）'}
              </pre>
            </>
          ) : (
            <>
              <div className='mb-2 font-medium text-gray-800 dark:text-gray-200'>
                运行输出
              </div>
              <div className='grid grid-cols-1 gap-3'>
                <div>
                  <div className='mb-1 text-xs text-gray-500 dark:text-gray-400'>
                    标准输出
                  </div>
                  <pre className='max-h-56 overflow-auto whitespace-pre-wrap text-gray-800 dark:text-gray-200'>
                    {stdout || '（暂无输出）'}
                  </pre>
                </div>
                <div>
                  <div className='mb-1 text-xs text-gray-500 dark:text-gray-400'>
                    错误输出
                  </div>
                  <pre className='max-h-56 overflow-auto whitespace-pre-wrap text-gray-800 dark:text-gray-200'>
                    {error ? `错误: ${error}` : stderr || '（暂无错误）'}
                  </pre>
                </div>
              </div>
            </>
          )}
          {/* 悬浮清空按钮（右下角） */}
          <button
            onClick={() => {
              setStdout('')
              setStderr('')
              setError(undefined)
            }}
            title='清空输出'
            aria-label='清空输出'
            className='absolute right-2 bottom-2 rounded-full bg-gray-200 p-2 text-xs text-gray-800 shadow hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
          >
            ⟲
          </button>
        </div>
      </div>
    </div>
  )
}

export default Playground
