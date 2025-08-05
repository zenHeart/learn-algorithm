import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

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
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900'>
          <div className='w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg dark:bg-gray-800'>
            <div className='mb-4 text-6xl'>💥</div>
            <h1 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
              页面出现错误
            </h1>
            <p className='mb-6 text-gray-600 dark:text-gray-300'>
              抱歉，页面在渲染时出现了问题
            </p>

            {this.state.error && (
              <details className='mb-6 text-left'>
                <summary className='mb-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300'>
                  错误详情
                </summary>
                <div className='max-h-32 overflow-auto rounded bg-gray-100 p-3 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200'>
                  <div className='mb-1 font-medium'>错误信息:</div>
                  <div className='mb-2'>{this.state.error.message}</div>
                  {this.state.error.stack && (
                    <>
                      <div className='mb-1 font-medium'>调用栈:</div>
                      <pre className='text-xs whitespace-pre-wrap'>
                        {this.state.error.stack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}

            <div className='space-y-3'>
              <button
                onClick={() => window.location.reload()}
                className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
              >
                重新加载页面
              </button>
              <button
                onClick={() => window.history.back()}
                className='w-full rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700'
              >
                返回上一页
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className='w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400'
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
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg dark:bg-gray-800'>
        <div className='mb-4 text-6xl'>🛣️</div>
        <h1 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
          路由错误
        </h1>
        <p className='mb-6 text-gray-600 dark:text-gray-300'>
          页面路由配置出现问题
        </p>
        <div className='space-y-3'>
          <button
            onClick={() => window.location.reload()}
            className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
          >
            重新加载
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className='w-full rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700'
          >
            回到首页
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary
