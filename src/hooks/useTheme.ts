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

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    // 初始化时确定正确的解析主题
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'dark') return 'dark'
    if (saved === 'light') return 'light'
    // system 或未设置时，使用系统偏好
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  // 初始化时立即应用主题
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (resolvedTheme === 'dark') {
      root.classList.add('dark')
    }
  }, []) // 只在组件挂载时运行一次

  useEffect(() => {
    const root = window.document.documentElement

    // 移除之前的主题类
    root.classList.remove('light', 'dark')

    let effectiveTheme: 'light' | 'dark'

    if (theme === 'system') {
      // 使用系统偏好
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    } else {
      effectiveTheme = theme
    }

    // 应用主题类 (Tailwind 只需要 'dark' 类)
    if (effectiveTheme === 'dark') {
      root.classList.add('dark')
    }
    setResolvedTheme(effectiveTheme)

    // 保存到 localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => {
      if (theme === 'system') {
        const effectiveTheme = mediaQuery.matches ? 'dark' : 'light'
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        if (effectiveTheme === 'dark') {
          root.classList.add('dark')
        }
        setResolvedTheme(effectiveTheme)
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
