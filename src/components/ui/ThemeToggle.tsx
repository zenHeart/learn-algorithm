import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const getThemeIcon = () => {
    if (theme === 'light') return '☀️'
    if (theme === 'dark') return '🌙'
    return '💻' // system
  }

  const getThemeText = () => {
    if (theme === 'light') return '浅色'
    if (theme === 'dark') return '深色'
    return '跟随系统'
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-secondary flex items-center space-x-2"
      title={`当前主题: ${getThemeText()}`}
    >
      <span className="text-lg">{getThemeIcon()}</span>
      <span className="hidden sm:inline">{getThemeText()}</span>
    </button>
  )
}
