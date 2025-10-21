import React from 'react'
import { Playground } from './playground/Playground'
import { parsePlaygroundConfig } from './playground/parser'

// 定义组件 props 类型
interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  [key: string]: any
}

interface ComponentProps {
  children: React.ReactNode
  [key: string]: any
}

interface LinkProps {
  href?: string
  children: React.ReactNode
  [key: string]: any
}

// 辅助函数：从 ReactNode 提取文本内容
function extractTextFromNode(node: React.ReactNode): string {
  if (typeof node === 'string') {
    return node
  }
  if (typeof node === 'number') {
    return String(node)
  }
  if (React.isValidElement(node)) {
    // @ts-ignore
    return extractTextFromNode(node.props.children)
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('')
  }
  return ''
}

// 自定义代码块组件
function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const language = className?.replace('language-', '') || 'text'
  const textContent = extractTextFromNode(children)

  return (
    <div className='relative my-4 max-w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700'>
      {/* 语言标签 */}
      {language && language !== 'text' && (
        <div className='flex items-center justify-between bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300'>
          <span className='uppercase'>{language}</span>
          <button
            onClick={() => navigator.clipboard?.writeText(textContent)}
            className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            title='复制代码'
          >
            <svg
              className='h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
              />
            </svg>
          </button>
        </div>
      )}
      <pre className='max-w-full overflow-x-auto bg-white text-sm dark:bg-gray-900'>
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  )
}

// 自定义内联代码组件
function InlineCode({ children, ...props }: ComponentProps) {
  return (
    <code
      className='rounded border border-gray-200 bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100'
      {...props}
    >
      {children}
    </code>
  )
}

// 自定义引用块组件
function Blockquote({ children, ...props }: ComponentProps) {
  return (
    <blockquote
      className='my-4 border-l-4 border-blue-500 bg-blue-50 py-2 pl-4 text-gray-800 italic dark:bg-blue-900/20 dark:text-gray-200'
      {...props}
    >
      {children}
    </blockquote>
  )
}

// 自定义表格组件
function Table({ children, ...props }: ComponentProps) {
  return (
    <div className='my-6 max-w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
      <table className='min-w-full table-auto text-sm' {...props}>
        {children}
      </table>
    </div>
  )
}

function TableHeader({ children, ...props }: ComponentProps) {
  return (
    <thead className='bg-gray-50 dark:bg-gray-800' {...props}>
      {children}
    </thead>
  )
}

function TableRow({ children, ...props }: ComponentProps) {
  return (
    <tr
      className='border-t border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50'
      {...props}
    >
      {children}
    </tr>
  )
}

function TableCell({ children, ...props }: ComponentProps) {
  return (
    <td
      className='px-4 py-2 text-sm text-gray-900 dark:text-gray-100'
      {...props}
    >
      {children}
    </td>
  )
}

function TableHeaderCell({ children, ...props }: ComponentProps) {
  return (
    <th
      className='px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100'
      {...props}
    >
      {children}
    </th>
  )
}

// 自定义链接组件
function Link({ href, children, ...props }: LinkProps) {
  // 内部链接
  if (href?.startsWith('/') || href?.startsWith('#')) {
    return (
      <a
        href={href}
        className='text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
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
      target='_blank'
      rel='noopener noreferrer'
      className='text-blue-600 underline transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
      {...props}
    >
      {children}
      <span className='ml-1 inline-block'>
        <svg
          className='h-3 w-3'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          />
        </svg>
      </span>
    </a>
  )
}

// 自定义标题组件
function Heading({ level, children, ...props }: HeadingProps) {
  const sizeClasses = {
    1: 'text-3xl font-bold mt-8 mb-4',
    2: 'text-2xl font-bold mt-6 mb-3',
    3: 'text-xl font-semibold mt-4 mb-2',
    4: 'text-lg font-semibold mt-3 mb-2',
    5: 'text-base font-semibold mt-2 mb-1',
    6: 'text-sm font-semibold mt-2 mb-1',
  }

  const HeadingComponent = React.createElement(
    `h${level}`,
    {
      className: `text-gray-900 dark:text-white ${sizeClasses[level]}`,
      ...props,
    },
    children
  )

  return HeadingComponent
}

// 信息提示框组件
function InfoBox({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'error' | 'success'
  title?: string
  children: React.ReactNode
}) {
  const typeStyles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    warning:
      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    error:
      'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
    success:
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
  }

  const icons = {
    info: '💡',
    warning: '⚠️',
    error: '❌',
    success: '✅',
  }

  return (
    <div className={`my-4 rounded-r-lg border-l-4 p-4 ${typeStyles[type]}`}>
      {title && (
        <div className='mb-2 flex items-center'>
          <span className='mr-2'>{icons[type]}</span>
          <span className='font-semibold'>{title}</span>
        </div>
      )}
      <div className='prose prose-sm max-w-none'>{children}</div>
    </div>
  )
}

// MDX 组件映射
export const mdxComponents = {
  // 基础元素
  h1: (props: ComponentProps) => <Heading level={1} {...props} />,
  h2: (props: ComponentProps) => <Heading level={2} {...props} />,
  h3: (props: ComponentProps) => <Heading level={3} {...props} />,
  h4: (props: ComponentProps) => <Heading level={4} {...props} />,
  h5: (props: ComponentProps) => <Heading level={5} {...props} />,
  h6: (props: ComponentProps) => <Heading level={6} {...props} />,

  // 代码相关
  pre: (props: ComponentProps & { children?: any }) => {
    // 尝试拦截 language-playground 代码块
    const child = Array.isArray(props.children)
      ? props.children[0]
      : props.children
    if (
      React.isValidElement(child) &&
  typeof (child.props as any)?.className === 'string' &&
  ((child.props as any).className as string).includes('language-playground')
    ) {
  const raw = extractTextFromNode((child.props as any).children)
      const cfg = parsePlaygroundConfig(raw || '')
      return <Playground {...cfg} />
    }
    return <CodeBlock {...props} />
  },
  code: (props: ComponentProps & { className?: string }) => {
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
  tbody: (props: ComponentProps) => <tbody {...props} />,
  tr: TableRow,
  td: TableCell,
  th: TableHeaderCell,

  // 自定义组件
  InfoBox,

  // YAML 前置内容样式处理
  section: (props: ComponentProps) => (
    <section className='max-w-full overflow-x-auto' {...props} />
  ),

  // 段落
  p: (props: ComponentProps) => (
    <p
      className='mb-4 max-w-full leading-relaxed break-words text-gray-700 dark:text-gray-300'
      {...props}
    />
  ),

  // 列表
  ul: (props: ComponentProps) => (
    <ul
      className='mb-4 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300'
      {...props}
    />
  ),
  ol: (props: ComponentProps) => (
    <ol
      className='mb-4 list-inside list-decimal space-y-1 text-gray-700 dark:text-gray-300'
      {...props}
    />
  ),
  li: (props: ComponentProps) => <li className='ml-4' {...props} />,

  // 分隔线
  hr: (props: ComponentProps) => (
    <hr className='my-8 border-gray-300 dark:border-gray-600' {...props} />
  ),
}
