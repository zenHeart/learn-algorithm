import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useViteDocs } from '@/utils/viteDocsLoader'
import type { SidebarItem } from '@/types/docs'

interface SidebarProps {
  module?: string
  className?: string
}

export default function Sidebar({ module, className = '' }: SidebarProps) {
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([])
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const { generateNavigation } = useViteDocs()

  useEffect(() => {
    if (!module) return

    const loadSidebar = async () => {
      try {
        setLoading(true)
        const items = await generateNavigation(module)
        setSidebarItems(items)
      } catch (error) {
        console.error('Failed to load sidebar:', error)
        setSidebarItems([])
      } finally {
        setLoading(false)
      }
    }

    loadSidebar()
  }, [module, generateNavigation])

  const isActivePath = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(path + '/')
    )
  }

  if (loading) {
    return (
      <aside
        className={`w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ${className}`}
      >
        <div className='p-4'>
          <div className='animate-pulse space-y-3'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='h-4 rounded bg-gray-200 dark:bg-gray-700'
              ></div>
            ))}
          </div>
        </div>
      </aside>
    )
  }

  if (!sidebarItems.length) {
    return (
      <aside
        className={`w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ${className}`}
      >
        <div className='p-4'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>暂无内容</p>
        </div>
      </aside>
    )
  }

  return (
    <aside
      className={`w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <div className='h-full overflow-y-auto p-4'>
        <h3 className='mb-4 text-lg font-semibold text-gray-900 capitalize dark:text-white'>
          {module?.replace('-', ' ')} 目录
        </h3>
        <nav className='space-y-1'>
          {sidebarItems.map((item, index) => (
            <SidebarItemComponent
              key={`${item.text}-${index}`}
              item={item}
              isActive={isActivePath}
              level={0}
            />
          ))}
        </nav>
      </div>
    </aside>
  )
}

interface SidebarItemComponentProps {
  item: SidebarItem
  isActive: (path: string) => boolean
  level: number
}

function SidebarItemComponent({
  item,
  isActive,
  level,
}: SidebarItemComponentProps) {
  const [isExpanded, setIsExpanded] = useState(!item.collapsed)

  const hasChildren = item.items && item.items.length > 0
  const isActiveItem = item.link ? isActive(item.link) : false
  const hasActiveChild =
    hasChildren &&
    item.items?.some(child =>
      child.link
        ? isActive(child.link)
        : child.items?.some(subChild =>
            subChild.link ? isActive(subChild.link) : false
          )
    )

  // 自动展开包含活跃项的分组
  useEffect(() => {
    if (hasActiveChild || isActiveItem) {
      setIsExpanded(true)
    }
  }, [hasActiveChild, isActiveItem])

  const paddingLeft = `${level * 16 + 8}px`

  return (
    <div>
      {/* 当前项 */}
      <div className='flex items-center'>
        {/* 展开/折叠按钮 */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className='flex h-6 w-6 flex-shrink-0 items-center justify-center text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300'
            style={{ marginLeft: paddingLeft }}
            aria-label={isExpanded ? '折叠' : '展开'}
          >
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
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
        )}

        {/* 链接或文本 */}
        {item.link ? (
          <Link
            to={item.link}
            className={`flex-1 rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
              isActiveItem
                ? 'bg-blue-100 font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100'
            }`}
            style={{ marginLeft: hasChildren ? '0' : paddingLeft }}
          >
            {item.text}
          </Link>
        ) : (
          <div
            className={`flex-1 px-3 py-2 text-sm font-medium ${
              hasActiveChild
                ? 'text-blue-700 dark:text-blue-300'
                : 'text-gray-900 dark:text-white'
            }`}
            style={{ marginLeft: hasChildren ? '0' : paddingLeft }}
          >
            {item.text}
          </div>
        )}
      </div>

      {/* 子项 */}
      {hasChildren && isExpanded && (
        <div className='mt-1 space-y-1'>
          {item.items?.map((child, index) => (
            <SidebarItemComponent
              key={`${child.text}-${index}`}
              item={child}
              isActive={isActive}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
