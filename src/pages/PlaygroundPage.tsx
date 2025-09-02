export default function PlaygroundPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-gray-900 dark:text-white'>
            🧪 Playground（基于 fenced 语法）
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            通过 Markdown 中的 ```playground fenced 代码块 插入交互式示例
          </p>
        </div>

        <div className='rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
            {/* 基本用法 */}
            <section>
              <h2 className='mb-3 text-xl font-bold text-gray-900 dark:text-white'>
                1) 基本语法
              </h2>
              <div className='space-y-4'>
                <CodeBlock
                  title='单文件模式'
                  code={[
                    '```playground',
                    'file: ./demo/hello.js',
                    'template: react',
                    '```',
                  ].join('\n')}
                />
                <CodeBlock
                  title='文件夹模式'
                  code={[
                    '```playground',
                    'dir: ./demo/',
                    'template: react',
                    'entry: App.jsx',
                    '```',
                  ].join('\n')}
                />
              </div>
            </section>

            {/* 多文件与配置 */}
            <section>
              <h2 className='mb-3 text-xl font-bold text-gray-900 dark:text-white'>
                2) 多文件与配置
              </h2>
              <div className='space-y-4'>
                <CodeBlock
                  title='显式多文件'
                  code={[
                    '```playground',
                    'files:',
                    '  - ./demo/App.jsx',
                    '  - ./demo/index.css',
                    '  - ./demo/utils.js',
                    'template: react',
                    'entry: App.jsx',
                    '```',
                  ].join('\n')}
                />
                <CodeBlock
                  title='文件配置（hidden/active）'
                  code={[
                    '```playground',
                    'dir: ./demo/',
                    'template: react',
                    'entry: App.jsx',
                    'files:',
                    "  - './App.jsx'",
                    "  - './components/Button.jsx':",
                    '      hidden: true',
                    "  - './index.css':",
                    '      active: true',
                    '```',
                  ].join('\n')}
                />
              </div>
            </section>

            {/* 全局选项 */}
            <section>
              <h2 className='mb-3 text-xl font-bold text-gray-900 dark:text-white'>
                3) 全局配置与选项
              </h2>
              <CodeBlock
                code={[
                  '```playground',
                  'file: ./demo/hello.ts',
                  'template: ts-react',
                  "title: 'Hello Playground'",
                  'options:',
                  '  runOnLoad: true',
                  '  editable: true',
                  '  sandbox: true',
                  '```',
                ].join('\n')}
              />
            </section>

            {/* 路径规则 */}
            <section>
              <h2 className='mb-3 text-xl font-bold text-gray-900 dark:text-white'>
                4) 路径与索引规则
              </h2>
              <ul className='list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300'>
                <li>所有相对路径从当前 Markdown 文件目录解析</li>
                <li>仅支持相对路径，禁止绝对路径与远程 URL</li>
                <li>
                  目录模式递归扫描，忽略 node_modules、dist、build、.git 等
                </li>
              </ul>
            </section>
          </div>

          <div className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
            组件模式等价用法：可在 React 中直接使用{' '}
            <code className='rounded bg-gray-100 px-1 dark:bg-gray-700'>
              &lt;Playground /&gt;
            </code>{' '}
            组件，并以 props 传入上述同名参数。
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeBlock({ title, code }: { title?: string; code: string }) {
  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
      {title && (
        <div className='bg-gray-100 px-4 py-2 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
          {title}
        </div>
      )}
      <pre className='max-w-full overflow-x-auto bg-white p-4 text-sm dark:bg-gray-900'>
        <code className='language-yaml whitespace-pre'>{code}</code>
      </pre>
    </div>
  )
}
