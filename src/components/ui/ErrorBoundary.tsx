import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('🚨 ErrorBoundary caught an error:', error)
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🚨 ErrorBoundary details:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-6xl mb-4">💥</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              页面出现错误
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              抱歉，页面在渲染时出现了问题
            </p>
            
            {this.state.error && (
              <details className="text-left mb-6">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  错误详情
                </summary>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs text-gray-800 dark:text-gray-200 overflow-auto max-h-32">
                  <div className="font-medium mb-1">错误信息:</div>
                  <div className="mb-2">{this.state.error.message}</div>
                  {this.state.error.stack && (
                    <>
                      <div className="font-medium mb-1">调用栈:</div>
                      <pre className="whitespace-pre-wrap text-xs">{this.state.error.stack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                重新加载页面
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                返回上一页
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                回到首页
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// React Router 错误元素组件
export function RouterErrorElement() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <div className="text-6xl mb-4">🛣️</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          路由错误
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          页面路由配置出现问题
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            重新加载
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            回到首页
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
