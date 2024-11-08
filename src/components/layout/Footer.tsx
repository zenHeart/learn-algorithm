export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              关于平台
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              交互式算法与数据结构学习平台，致力于让算法学习更加有趣和高效。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              快速链接
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/algorithms" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  算法学习
                </a>
              </li>
              <li>
                <a href="/data-structures" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  数据结构
                </a>
              </li>
              <li>
                <a href="/playground" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  在线验证
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              技术栈
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600 dark:text-gray-300">React 19.x</li>
              <li className="text-gray-600 dark:text-gray-300">TypeScript 5.5</li>
              <li className="text-gray-600 dark:text-gray-300">Vite 7.x</li>
              <li className="text-gray-600 dark:text-gray-300">Tailwind CSS 4.x</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              联系我们
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600 dark:text-gray-300">
                GitHub: 
                <a 
                  href="https://github.com/username/learn-algorithm" 
                  className="ml-1 text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  learn-algorithm
                </a>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                邮箱: algorithm@example.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © 2024 算法学习平台. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                隐私政策
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm">
                使用条款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
