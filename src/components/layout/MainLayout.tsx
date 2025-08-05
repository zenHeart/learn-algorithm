import { Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import Header from './Header'
import Footer from './Footer'

export default function MainLayout() {
  const location = useLocation()

  // 初始化主题
  useTheme()

  // 检查是否是详情页面路径 (模块/分类/主题 格式)
  const isDetailPage = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    // 如果路径有2个或以上段，且不是主模块页，则认为是详情页
    const lastSegment = pathSegments[pathSegments.length - 1]
    return (
      pathSegments.length >= 2 &&
      lastSegment &&
      ![
        'algorithms',
        'data-structures',
        'leetcode',
        'math',
        'encode',
        'playground',
      ].includes(lastSegment)
    )
  }

  const showFooter = !isDetailPage()

  return (
    <div className='flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900'>
      {/* 固定头部 */}
      <Header />

      {/* 主内容区 - 在详情页时占据全高度，考虑固定头部的高度 */}
      <main className={`flex-1 ${isDetailPage() ? 'pt-16' : ''}`}>
        <Outlet />
      </main>

      {/* 条件性显示 Footer */}
      {showFooter && <Footer />}
    </div>
  )
}
