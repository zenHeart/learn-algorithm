import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navigation = [
  { name: '首页', href: '/' },
  { name: '数据结构', href: '/data-structures' },
  { name: '算法', href: '/algorithms' },
  { name: 'LeetCode', href: '/leetcode' },
  { name: '数学基础', href: '/math' },
  { name: '编码原理', href: '/encode' },
  { name: '在线验证', href: '/playground' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <header className='fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <div className='flex min-w-0 flex-1 items-center pr-4'>
            <Link
              to='/'
              className='flex min-w-0 items-center space-x-2 sm:space-x-3'
            >
              <div className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600'>
                <span className='text-sm font-bold text-white'>AL</span>
              </div>
              <span className='truncate text-base font-bold text-gray-900 sm:text-lg dark:text-white'>
                算法学习平台
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden space-x-8 md:flex'>
            {navigation.map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className='flex flex-shrink-0 items-center space-x-2'>
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-700'
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
            >
              <svg
                className='h-6 w-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='border-t border-gray-200 py-4 md:hidden dark:border-gray-700'>
            <nav className='space-y-2'>
              {navigation.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
