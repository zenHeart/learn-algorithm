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
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  if (loading) {
    return (
      <aside className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="p-4">
          <div className="animate-pulse space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </aside>
    )
  }

  if (!sidebarItems.length) {
    return (
      <aside className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${className}`}>
        <div className="p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            暂无内容
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside className={`w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="p-4 h-full overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
          {module?.replace('-', ' ')} 目录
        </h3>
        <nav className="space-y-1">
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

function SidebarItemComponent({ item, isActive, level }: SidebarItemComponentProps) {
  const [isExpanded, setIsExpanded] = useState(!item.collapsed)

  const hasChildren = item.items && item.items.length > 0
  const isActiveItem = item.link ? isActive(item.link) : false
  const hasActiveChild = hasChildren && item.items?.some(child => 
    child.link ? isActive(child.link) : 
    child.items?.some(subChild => subChild.link ? isActive(subChild.link) : false)
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
      <div className="flex items-center">
        {/* 展开/折叠按钮 */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            style={{ marginLeft: paddingLeft }}
            aria-label={isExpanded ? "折叠" : "展开"}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* 链接或文本 */}
        {item.link ? (
          <Link
            to={item.link}
            className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
              isActiveItem
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
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
        <div className="mt-1 space-y-1">
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
