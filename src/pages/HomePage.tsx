import { Link } from 'react-router-dom'

const modules = [
  {
    title: '数据结构',
    description: '可视化学习各种数据结构，包括数组、链表、树、图等',
    icon: '📊',
    path: '/data-structures',
    color: 'bg-blue-500',
  },
  {
    title: '算法',
    description: '交互式算法学习，支持代码编辑和在线执行',
    icon: '⚡',
    path: '/algorithms',
    color: 'bg-green-500',
  },
  {
    title: 'LeetCode',
    description: '精选题目练习，多语言支持，测试用例验证',
    icon: '🎯',
    path: '/leetcode',
    color: 'bg-red-500',
  },
  {
    title: '数学基础',
    description: '算法相关的数学知识，公式渲染，概念解释',
    icon: '🧮',
    path: '/math',
    color: 'bg-purple-500',
  },
  {
    title: '编码原理',
    description: '编码算法可视化，UTF-8、压缩算法等',
    icon: '🔐',
    path: '/encode',
    color: 'bg-orange-500',
  },
  {
    title: '在线验证',
    description: '实验不同功能模板，代码编辑和可视化测试',
    icon: '🧪',
    path: '/playground',
    color: 'bg-indigo-500',
  },
]

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      <section className='bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <h1 className='animate-fade-in mb-6 text-4xl font-bold md:text-6xl'>
            算法学习平台
          </h1>
          <p className='animate-slide-up mb-8 text-xl opacity-90 md:text-2xl'>
            交互式算法与数据结构学习平台
          </p>
          <div className='animate-slide-up flex flex-col justify-center gap-4 sm:flex-row'>
            <Link
              to='/algorithms'
              className='rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100'
            >
              开始学习算法
            </Link>
            <Link
              to='/playground'
              className='rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-600'
            >
              在线体验
            </Link>
          </div>
        </div>
      </section>

      <section className='bg-gray-50 py-20 dark:bg-gray-900'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-16 text-center'>
            <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white'>
              学习模块
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>
              选择一个模块开始你的算法学习之旅
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {modules.map(module => (
              <ModuleCard key={module.path} module={module} />
            ))}
          </div>
        </div>
      </section>

      <section className='py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 gap-8 text-center md:grid-cols-4'>
            <StatItem number='50+' label='算法题目' />
            <StatItem number='20+' label='数据结构' />
            <StatItem number='5+' label='编程语言' />
            <StatItem number='∞' label='学习乐趣' />
          </div>
        </div>
      </section>
    </div>
  )
}

function ModuleCard({ module }: { module: (typeof modules)[0] }) {
  return (
    <Link
      to={module.path}
      className='group animate-slide-up block overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800'
    >
      <div className='p-6'>
        <div
          className={`h-16 w-16 ${module.color} mb-4 flex items-center justify-center rounded-lg transition-transform group-hover:scale-110`}
        >
          <span className='text-2xl'>{module.icon}</span>
        </div>
        <h3 className='mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white'>
          {module.title}
        </h3>
        <p className='leading-relaxed text-gray-600 dark:text-gray-300'>
          {module.description}
        </p>
        <div className='mt-4 flex items-center font-medium text-blue-600 transition-transform group-hover:translate-x-2'>
          开始学习
          <svg
            className='ml-2 h-4 w-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className='animate-fade-in'>
      <div className='mb-2 text-3xl font-bold text-blue-600 md:text-4xl'>
        {number}
      </div>
      <div className='text-gray-600 dark:text-gray-300'>{label}</div>
    </div>
  )
}
