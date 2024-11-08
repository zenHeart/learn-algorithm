import { Link } from 'react-router-dom'

const modules = [
  {
    title: '数据结构',
    description: '可视化学习各种数据结构，包括数组、链表、树、图等',
    icon: '📊',
    path: '/data-structures',
    color: 'bg-blue-500'
  },
  {
    title: '算法',
    description: '交互式算法学习，支持代码编辑和在线执行',
    icon: '⚡',
    path: '/algorithms',
    color: 'bg-green-500'
  },
  {
    title: 'LeetCode',
    description: '精选题目练习，多语言支持，测试用例验证',
    icon: '🎯',
    path: '/leetcode',
    color: 'bg-red-500'
  },
  {
    title: '数学基础',
    description: '算法相关的数学知识，公式渲染，概念解释',
    icon: '🧮',
    path: '/math',
    color: 'bg-purple-500'
  },
  {
    title: '编码原理',
    description: '编码算法可视化，UTF-8、压缩算法等',
    icon: '🔐',
    path: '/encode',
    color: 'bg-orange-500'
  },
  {
    title: '在线验证',
    description: '实验不同功能模板，代码编辑和可视化测试',
    icon: '🧪',
    path: '/playground',
    color: 'bg-indigo-500'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            算法学习平台
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            交互式算法与数据结构学习平台
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/algorithms"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              开始学习算法
            </Link>
            <Link
              to="/playground"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              在线体验
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              学习模块
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              选择一个模块开始你的算法学习之旅
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <ModuleCard key={module.path} module={module} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem number="50+" label="算法题目" />
            <StatItem number="20+" label="数据结构" />
            <StatItem number="5+" label="编程语言" />
            <StatItem number="∞" label="学习乐趣" />
          </div>
        </div>
      </section>
    </div>
  )
}

function ModuleCard({ module, index }: { module: typeof modules[0]; index: number }) {
  return (
    <Link
      to={module.path}
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden animate-slide-up"
    >
      <div className="p-6">
        <div className={`w-16 h-16 ${module.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <span className="text-2xl">{module.icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
          {module.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {module.description}
        </p>
        <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
          开始学习 
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="animate-fade-in">
      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-300">
        {label}
      </div>
    </div>
  )
}
