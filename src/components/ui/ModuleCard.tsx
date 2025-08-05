import { useNavigate } from 'react-router-dom'
import type { ModuleItem } from '@/hooks/useModuleData'

interface ModuleCardProps {
  item: ModuleItem
  className?: string
}

export function ModuleCard({ item, className = '' }: ModuleCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(item.path)
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'simple':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default:
        return ''
    }
  }

  const getDifficultyText = (difficulty?: string) => {
    switch (difficulty) {
      case 'simple':
        return '简单'
      case 'medium':
        return '中等'
      case 'hard':
        return '困难'
      default:
        return ''
    }
  }

  return (
    <div
      className={`group transform cursor-pointer rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-200 hover:scale-105 hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600 ${className} `}
      onClick={handleClick}
    >
      <div className='p-6'>
        {/* 图标和标题 */}
        <div className='mb-3 flex items-start justify-between'>
          <div className='flex items-center'>
            <div className='mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 transition-colors group-hover:bg-blue-200 dark:bg-blue-900 dark:group-hover:bg-blue-800'>
              <span className='text-2xl'>{item.icon}</span>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400'>
                {item.title}
              </h3>
              {item.difficulty && (
                <span
                  className={`mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(item.difficulty)}`}
                >
                  {getDifficultyText(item.difficulty)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 描述 */}
        <p
          className='mb-4 text-sm text-gray-600 dark:text-gray-300'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.description}
        </p>

        {/* 标签 */}
        {item.tags && item.tags.length > 0 && (
          <div className='mb-3 flex flex-wrap gap-2'>
            {item.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className='inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                +{item.tags.length - 3} 更多
              </span>
            )}
          </div>
        )}

        {/* 类型和状态指示器 */}
        <div className='mb-2 flex items-center gap-2'>
          {item.isFlattened ? (
            <span className='inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-300'>
              <svg className='h-3 w-3' fill='currentColor' viewBox='0 0 20 20'>
                <path
                  fillRule='evenodd'
                  d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'
                  clipRule='evenodd'
                />
              </svg>
              直接内容
            </span>
          ) : (
            <span className='inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800 dark:bg-purple-900 dark:text-purple-300'>
              <svg className='h-3 w-3' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z' />
              </svg>
              目录内容
            </span>
          )}

          {item.fileCount !== undefined && (
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              {item.fileCount} 个文件
            </span>
          )}
        </div>

        {/* 进入指示器 */}
        <div className='flex items-center justify-between'>
          <div className='text-xs text-gray-500 dark:text-gray-400'>
            {item.isFlattened ? '点击阅读文档' : '点击查看详情'}
          </div>
          <div className='text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400'>
            <svg
              className='h-4 w-4'
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModuleCard
