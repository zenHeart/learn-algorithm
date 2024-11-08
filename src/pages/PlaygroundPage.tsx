export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🧪 在线验证
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            实验不同功能模板，代码编辑和可视化测试
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⚗️</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              实验平台建设中...
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              在线代码编辑器和可视化验证工具开发中
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <TemplateCard title="Demo" description="演示模式" color="blue" />
              <TemplateCard title="Exercise" description="练习模式" color="green" />
              <TemplateCard title="Test" description="测试模式" color="yellow" />
              <TemplateCard title="Data-Structure" description="数据结构" color="purple" />
              <TemplateCard title="Encode" description="编码可视化" color="orange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TemplateCard({ title, description, color }: { title: string; description: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    green: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200'
  }
  
  return (
    <div className={`p-4 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  )
}
