import { useState, useEffect, Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { MDXProvider } from '@/components/mdx/MDXProvider'
import { useViteDocs } from '@/utils/viteDocsLoader'
import Sidebar from '@/components/layout/Sidebar'
import type { DocMeta } from '@/types/docs'

interface MDXContentProps {
  docPath: string
}

// 使用 Vite 异步加载的 MDX 内容组件
function MDXContent({ docPath }: MDXContentProps) {
  const [MDXComponent, setMDXComponent] = useState<React.ComponentType | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState<DocMeta | null>(null)
  const { loadDocument, getAllDocumentPaths } = useViteDocs()

  useEffect(() => {
    const loadMDX = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log('🔍 Loading document:', docPath)

        // 获取所有可用的文档路径进行调试
        const allPaths = getAllDocumentPaths()
        console.log('📁 Available document paths:', allPaths)

        const module = await loadDocument(docPath)

        if (module && module.default) {
          console.log('✅ Successfully loaded module for:', docPath)
          setMDXComponent(() => module.default)
          setMeta(module.frontmatter || null)
        } else {
          console.error('❌ Module not found or invalid for:', docPath)
          setError(`无法找到文档: ${docPath}`)
        }
      } catch (err) {
        console.error('💥 Failed to load MDX:', err)
        setError(err instanceof Error ? err.message : '加载文档失败')
      } finally {
        setLoading(false)
      }
    }

    if (docPath) {
      loadMDX()
    }
  }, [docPath]) // 只依赖 docPath

  if (loading) {
    return (
      <div className='prose max-w-none'>
        <div className='animate-pulse space-y-4'>
          <div className='h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700'></div>
          <div className='space-y-2'>
            <div className='h-4 rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700'></div>
            <div className='h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700'></div>
          </div>
          <div className='h-32 rounded bg-gray-200 dark:bg-gray-700'></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='py-12 text-center'>
        <div className='mb-4 text-6xl'>📄</div>
        <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
          文档加载失败
        </h2>
        <p className='mb-6 text-gray-600 dark:text-gray-300'>{error}</p>
        <div className='mb-4 space-y-2 text-sm text-gray-500 dark:text-gray-400'>
          <div>
            尝试的路径:{' '}
            <code className='rounded bg-gray-100 px-2 py-1 dark:bg-gray-800'>
              {docPath}
            </code>
          </div>
          <div>请检查浏览器控制台获取更多调试信息</div>
        </div>
        <div className='flex justify-center gap-4'>
          <button
            onClick={() => window.history.back()}
            className='rounded-lg bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700'
          >
            返回上级
          </button>
          <button
            onClick={() => window.location.reload()}
            className='rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'
          >
            重新加载
          </button>
        </div>
      </div>
    )
  }

  if (!MDXComponent) {
    return (
      <div className='py-12 text-center'>
        <div className='mb-4 text-6xl'>📄</div>
        <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
          文档组件未找到
        </h2>
        <p className='mb-4 text-gray-600 dark:text-gray-300'>
          文档已找到但无法渲染组件
        </p>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          路径:{' '}
          <code className='rounded bg-gray-100 px-2 py-1 dark:bg-gray-800'>
            {docPath}
          </code>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* 文档元信息 */}
      {meta && (
        <div className='mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800'>
          {meta.description && (
            <p className='mb-2 text-gray-600 dark:text-gray-300'>
              {meta.description}
            </p>
          )}
          <div className='flex flex-wrap gap-2 text-sm'>
            {meta.difficulty && (
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  meta.difficulty === 'simple'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : meta.difficulty === 'medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}
              >
                {meta.difficulty === 'simple'
                  ? '简单'
                  : meta.difficulty === 'medium'
                    ? '中等'
                    : '困难'}
              </span>
            )}
            {meta.tags?.map((tag, index) => (
              <span
                key={index}
                className='rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300'
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* MDX 内容 */}
      <article className='prose prose-lg dark:prose-invert max-w-none'>
        <MDXComponent />
      </article>
    </div>
  )
}

export default function DetailPage() {
  const { module, category, topic } = useParams()
  const navigate = useNavigate()

  // 构建文档路径
  const buildDocPath = () => {
    const parts = [module, category, topic].filter(Boolean)
    return '/' + parts.join('/')
  }

  const docPath = buildDocPath()
  const currentModule = module

  console.log('🛣️  DetailPage params:', { module, category, topic })
  console.log('🔗 Built doc path:', docPath)

  // 如果没有模块，显示错误页面
  if (!module) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
        <div className='text-center'>
          <div className='mb-4 text-6xl'>🤔</div>
          <h1 className='mb-4 text-3xl font-bold text-gray-900 dark:text-white'>
            页面参数错误
          </h1>
          <p className='mb-6 text-gray-600 dark:text-gray-300'>
            缺少必要的模块参数
          </p>
          <button
            onClick={() => navigate('/')}
            className='rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'
          >
            返回首页
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='flex'>
        {/* 侧边栏 */}
        <Sidebar
          module={currentModule}
          className='fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto'
        />

        {/* 主内容区 */}
        <main className='ml-64 flex-1'>
          <div className='mx-auto max-w-4xl px-6 py-8'>
            {/* 面包屑导航 */}
            <nav className='mb-8'>
              <ol className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300'>
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className='transition-colors hover:text-blue-600 dark:hover:text-blue-400'
                  >
                    首页
                  </button>
                </li>
                {module && (
                  <>
                    <span className='text-gray-400'>/</span>
                    <li>
                      <button
                        onClick={() => navigate(`/${module}`)}
                        className='capitalize transition-colors hover:text-blue-600 dark:hover:text-blue-400'
                      >
                        {module.replace('-', ' ')}
                      </button>
                    </li>
                  </>
                )}
                {category && (
                  <>
                    <span className='text-gray-400'>/</span>
                    <li>
                      <button
                        onClick={() => navigate(`/${module}/${category}`)}
                        className='transition-colors hover:text-blue-600 dark:hover:text-blue-400'
                      >
                        {category.replace(/^\d+\./, '').replace('-', ' ')}
                      </button>
                    </li>
                  </>
                )}
                {topic && (
                  <>
                    <span className='text-gray-400'>/</span>
                    <li className='font-medium text-gray-900 dark:text-white'>
                      {topic.replace(/^\d+\./, '').replace('-', ' ')}
                    </li>
                  </>
                )}
              </ol>
            </nav>

            {/* MDX 内容 */}
            <MDXProvider>
              <Suspense
                fallback={
                  <div className='prose max-w-none'>
                    <div className='animate-pulse space-y-4'>
                      <div className='h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700'></div>
                      <div className='space-y-2'>
                        <div className='h-4 rounded bg-gray-200 dark:bg-gray-700'></div>
                        <div className='h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700'></div>
                        <div className='h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700'></div>
                      </div>
                    </div>
                  </div>
                }
              >
                <MDXContent docPath={docPath} />
              </Suspense>
            </MDXProvider>

            {/* 导航按钮 */}
            <div className='mt-12 border-t border-gray-200 pt-8 dark:border-gray-700'>
              <div className='flex items-center justify-between'>
                <button
                  onClick={() => window.history.back()}
                  className='flex items-center text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                >
                  <svg
                    className='mr-2 h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 19l-7-7 7-7'
                    />
                  </svg>
                  返回上级
                </button>

                <button
                  onClick={() => navigate(`/${module}`)}
                  className='flex items-center text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                >
                  模块首页
                  <svg
                    className='ml-2 h-4 w-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
