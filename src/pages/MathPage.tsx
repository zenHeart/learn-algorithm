export default function MathPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🧮 数学基础
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            算法相关的数学知识，公式渲染，概念解释
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📐</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              知识库构建中...
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              数学基础知识和公式渲染功能开发中
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TopicCard title="离散数学" description="集合论、图论、逻辑" />
              <TopicCard title="概率统计" description="随机算法分析" />
              <TopicCard title="线性代数" description="矩阵运算、特征值" />
              <TopicCard title="数论" description="素数、同余、密码学" />
              <TopicCard title="组合数学" description="排列组合、生成函数" />
              <TopicCard title="微积分" description="极限、导数、积分" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TopicCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
