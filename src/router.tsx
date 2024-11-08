import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import { RouterErrorElement } from '@/components/ui/ErrorBoundary'
import HomePage from '@/pages/HomePage'
import DataStructuresPage from '@/pages/DataStructuresPage'
import AlgorithmsPage from '@/pages/AlgorithmsPage'
import LeetCodePage from '@/pages/LeetCodePage'
import MathPage from '@/pages/MathPage'
import EncodePage from '@/pages/EncodePage'
import PlaygroundPage from '@/pages/PlaygroundPage'
import DetailPage from '@/pages/DetailPage'

// GitHub Pages 子路径支持
const baseUrl = import.meta.env.BASE_URL || '/'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: 'data-structures',
          element: <DataStructuresPage />,
        },
        {
          path: 'algorithms',
          element: <AlgorithmsPage />,
        },
        {
          path: 'leetcode',
          element: <LeetCodePage />,
        },
        {
          path: 'math',
          element: <MathPage />,
        },
        {
          path: 'encode',
          element: <EncodePage />,
        },
        {
          path: 'playground',
          element: <PlaygroundPage />,
        },
        // 动态路由：模块详情页
        {
          path: ':module',
          element: <DetailPage />,
        },
        {
          path: ':module/:category',
          element: <DetailPage />,
        },
        {
          path: ':module/:category/:topic',
          element: <DetailPage />,
        },
        // 404 页面
        {
          path: '*',
          element: (
            <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
              <div className='text-center'>
                <div className='mb-4 text-6xl'>🤖</div>
                <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
                  404 - 页面未找到
                </h1>
                <p className='mb-8 text-gray-600 dark:text-gray-300'>
                  抱歉，您访问的页面不存在。
                </p>
                <a
                  href='/'
                  className='inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'
                >
                  返回首页
                </a>
              </div>
            </div>
          ),
        },
      ],
    },
  ],
  {
    basename: baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl,
  }
)
