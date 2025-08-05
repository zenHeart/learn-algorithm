import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 从 localStorage 获取用户偏好
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved
    }
    return 'system'
  })

  // 计算实际应用的主题
  const getResolvedTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return currentTheme
  }

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    getResolvedTheme(theme)
  )

  // 统一的主题应用逻辑
  useEffect(() => {
    const root = window.document.documentElement
    const newResolvedTheme = getResolvedTheme(theme)

    // 移除之前的主题类
    root.classList.remove('light', 'dark')

    // 应用新主题类 (Tailwind 只需要 'dark' 类)
    if (newResolvedTheme === 'dark') {
      root.classList.add('dark')
    }

    setResolvedTheme(newResolvedTheme)

    // 保存到 localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'system') {
        const newResolvedTheme = mediaQuery.matches ? 'dark' : 'light'
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        if (newResolvedTheme === 'dark') {
          root.classList.add('dark')
        }
        setResolvedTheme(newResolvedTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark'
      if (prev === 'dark') return 'system'
      return 'light'
    })
  }

  const setLightTheme = () => setTheme('light')
  const setDarkTheme = () => setTheme('dark')
  const setSystemTheme = () => setTheme('system')

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
  }
}
