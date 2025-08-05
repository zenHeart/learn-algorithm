import { useModuleData } from '@/hooks/useModuleData'
import { ModuleCard } from './ModuleCard'

interface ModulePageProps {
  moduleName: string
  title: string
  description: string
  icon: string
  accentColor?: string
}

export function ModulePage({
  moduleName,
  title,
  description,
  icon,
  accentColor = 'blue',
}: ModulePageProps) {
  const { items, loading, error } = useModuleData(moduleName)

  const getAccentColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 dark:bg-blue-900',
      green: 'bg-green-100 dark:bg-green-900',
      purple: 'bg-purple-100 dark:bg-purple-900',
      red: 'bg-red-100 dark:bg-red-900',
      yellow: 'bg-yellow-100 dark:bg-yellow-900',
      indigo: 'bg-indigo-100 dark:bg-indigo-900',
      pink: 'bg-pink-100 dark:bg-pink-900',
    }
    return colorMap[color] || colorMap.blue
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
        <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900'>
              <span className='text-4xl'>❌</span>
            </div>
            <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
              加载失败
            </h2>
            <p className='mb-6 text-gray-600 dark:text-gray-300'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'
            >
              重新加载
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        {/* 页面头部 */}
        <div className='mb-12 text-center'>
          <div
            className={`h-24 w-24 ${getAccentColorClasses(accentColor)} mx-auto mb-6 flex items-center justify-center rounded-full`}
          >
            <span className='text-4xl'>{icon}</span>
          </div>
          <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
            {title}
          </h1>
          <p className='mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300'>
            {description}
          </p>
        </div>

        {/* 内容区域 */}
        {loading ? (
          // 加载状态
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'
              >
                <div className='animate-pulse'>
                  <div className='mb-4 flex items-center'>
                    <div className='mr-4 h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700'></div>
                    <div className='flex-1'>
                      <div className='mb-2 h-4 rounded bg-gray-200 dark:bg-gray-700'></div>
                      <div className='h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-700'></div>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='h-3 rounded bg-gray-200 dark:bg-gray-700'></div>
                    <div className='h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700'></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          // 有内容时显示卡片
          <>
            {/* 统计信息 */}
            <div className='mb-8 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
                    {moduleName === 'algorithms' && '算法模块'}
                    {moduleName === 'data-structures' && '数据结构模块'}
                    {moduleName === 'leetcode' && 'LeetCode 题库'}
                    {moduleName === 'math' && '数学基础'}
                    {moduleName === 'encode' && '编码原理'}
                  </h3>
                  <p className='text-gray-600 dark:text-gray-300'>
                    共 {items.length} 个主题，涵盖从基础到高级的内容
                  </p>
                </div>
                <div className='text-right'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                    {items.length}
                  </div>
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    个主题
                  </div>
                </div>
              </div>
            </div>

            {/* 卡片网格 */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {items.map(item => (
                <ModuleCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          // 无内容时的提示
          <div className='rounded-lg bg-white p-12 text-center shadow-md dark:bg-gray-800'>
            <div className='mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700'>
              <span className='text-4xl'>📂</span>
            </div>
            <h3 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>
              暂无内容
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {moduleName} 模块的内容正在准备中，敬请期待！
            </p>
          </div>
        )}

        {/* 底部信息 */}
        {items.length > 0 && (
          <div className='mt-12 text-center'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              点击任意卡片开始学习相关内容
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModulePage
