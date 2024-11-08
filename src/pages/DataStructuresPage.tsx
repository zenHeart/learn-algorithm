export default function DataStructuresPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📊 数据结构
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            可视化学习各种数据结构，动手实践理解核心概念
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🏗️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              正在构建中...
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              数据结构可视化功能正在开发中，敬请期待！
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FeatureCard title="数组" description="线性数据结构" />
              <FeatureCard title="链表" description="动态数据结构" />
              <FeatureCard title="树" description="层次数据结构" />
              <FeatureCard title="图" description="网络数据结构" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
