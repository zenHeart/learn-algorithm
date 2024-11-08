export default function LeetCodePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 LeetCode
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            精选题目练习，多语言支持，测试用例验证
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              题库建设中...
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              精选算法题目即将上线，支持多语言在线编程
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DifficultyCard level="简单" count="20+" color="green" />
              <DifficultyCard level="中等" count="25+" color="orange" />
              <DifficultyCard level="困难" count="5+" color="red" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DifficultyCard({ level, count, color }: { level: string; count: string; color: string }) {
  const colorClasses = {
    green: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
    red: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
  }
  
  return (
    <div className={`p-4 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="font-semibold mb-2">{level}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  )
}
