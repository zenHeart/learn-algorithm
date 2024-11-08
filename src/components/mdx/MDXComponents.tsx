import type { MDXComponents } from 'mdx/types'

// 自定义代码块组件
function CodeBlock({ children, className, ...props }: any) {
  const language = className?.replace('language-', '') || 'text'
  
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
        {language}
      </div>
      <pre 
        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-700"
        {...props}
      >
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  )
}

// 自定义内联代码组件
function InlineCode({ children, ...props }: any) {
  return (
    <code 
      className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200 dark:border-gray-700"
      {...props}
    >
      {children}
    </code>
  )
}

// 自定义引用块组件
function Blockquote({ children, ...props }: any) {
  return (
    <blockquote 
      className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 text-gray-800 dark:text-gray-200 italic"
      {...props}
    >
      {children}
    </blockquote>
  )
}

// 自定义表格组件
function Table({ children, ...props }: any) {
  return (
    <div className="overflow-x-auto my-6">
      <table 
        className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg"
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function TableHeader({ children, ...props }: any) {
  return (
    <thead 
      className="bg-gray-50 dark:bg-gray-800"
      {...props}
    >
      {children}
    </thead>
  )
}

function TableRow({ children, ...props }: any) {
  return (
    <tr 
      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
      {...props}
    >
      {children}
    </tr>
  )
}

function TableCell({ children, ...props }: any) {
  return (
    <td 
      className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </td>
  )
}

function TableHeaderCell({ children, ...props }: any) {
  return (
    <th 
      className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </th>
  )
}

// 自定义链接组件
function Link({ href, children, ...props }: any) {
  // 内部链接
  if (href?.startsWith('/') || href?.startsWith('#')) {
    return (
      <a 
        href={href}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  }
  
  // 外部链接
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
      {...props}
    >
      {children}
      <span className="inline-block ml-1">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </span>
    </a>
  )
}

// 自定义标题组件
function Heading({ level, children, ...props }: any) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements
  const sizeClasses = {
    1: 'text-3xl font-bold mt-8 mb-4',
    2: 'text-2xl font-bold mt-6 mb-3',
    3: 'text-xl font-semibold mt-4 mb-2',
    4: 'text-lg font-semibold mt-3 mb-2',
    5: 'text-base font-semibold mt-2 mb-1',
    6: 'text-sm font-semibold mt-2 mb-1'
  }
  
  return (
    <Component 
      className={`text-gray-900 dark:text-white ${sizeClasses[level as keyof typeof sizeClasses]}`}
      {...props}
    >
      {children}
    </Component>
  )
}

// 信息提示框组件
function InfoBox({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'error' | 'success', title?: string, children: React.ReactNode }) {
  const typeStyles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
  }
  
  const icons = {
    info: '💡',
    warning: '⚠️',
    error: '❌',
    success: '✅'
  }
  
  return (
    <div className={`border-l-4 p-4 my-4 rounded-r-lg ${typeStyles[type]}`}>
      {title && (
        <div className="flex items-center mb-2">
          <span className="mr-2">{icons[type]}</span>
          <span className="font-semibold">{title}</span>
        </div>
      )}
      <div className="prose prose-sm max-w-none">
        {children}
      </div>
    </div>
  )
}

// MDX 组件映射
export const mdxComponents: MDXComponents = {
  // 基础元素
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  
  // 代码相关
  pre: (props) => <CodeBlock {...props} />,
  code: (props) => {
    // 如果是在 pre 标签内，返回原始 code
    if (props.className) {
      return <code {...props} />
    }
    // 内联代码
    return <InlineCode {...props} />
  },
  
  // 其他元素
  blockquote: Blockquote,
  a: Link,
  
  // 表格
  table: Table,
  thead: TableHeader,
  tbody: (props) => <tbody {...props} />,
  tr: TableRow,
  td: TableCell,
  th: TableHeaderCell,
  
  // 自定义组件
  InfoBox,
  
  // 段落
  p: (props) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
  
  // 列表
  ul: (props) => <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-1" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-300 space-y-1" {...props} />,
  li: (props) => <li className="ml-4" {...props} />,
  
  // 分隔线
  hr: (props) => <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
}
