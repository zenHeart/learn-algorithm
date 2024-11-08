export default function AlgorithmsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ⚡ 算法
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            交互式算法学习，代码编辑和在线执行
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔧</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              开发中...
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              算法交互式学习环境即将上线
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FeatureCard title="排序算法" description="快排、归并、堆排序等" />
              <FeatureCard title="搜索算法" description="二分、DFS、BFS等" />
              <FeatureCard title="动态规划" description="背包、最长子序列等" />
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
