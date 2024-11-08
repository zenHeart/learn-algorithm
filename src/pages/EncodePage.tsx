export default function EncodePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🔐 编码原理
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            编码算法可视化，UTF-8、压缩算法等
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔣</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              可视化编码器开发中...
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              编码算法可视化工具即将上线
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <EncodingCard title="UTF-8" description="Unicode 编码" />
              <EncodingCard title="Base64" description="二进制转文本" />
              <EncodingCard title="霍夫曼编码" description="无损压缩" />
              <EncodingCard title="LZ77" description="字典压缩" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EncodingCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
