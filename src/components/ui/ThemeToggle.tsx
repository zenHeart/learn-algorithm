import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme, resolvedTheme } = useTheme()

  const getThemeIcon = () => {
    // 使用 resolvedTheme 来显示实际的主题状态
    if (resolvedTheme === 'dark') {
      return (
        <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
          <path
            fillRule='evenodd'
            d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'
            clipRule='evenodd'
          />
        </svg>
      )
    }
    return (
      <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
          clipRule='evenodd'
        />
      </svg>
    )
  }

  const getThemeText = () => {
    if (theme === 'light') return '浅色模式'
    if (theme === 'dark') return '深色模式'
    return '跟随系统'
  }

  return (
    <button
      onClick={toggleTheme}
      className='rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'
      title={`切换主题 (当前: ${getThemeText()})`}
      aria-label='切换主题'
    >
      {getThemeIcon()}
    </button>
  )
}
