import { useState } from 'react'
import {
  linkList,
  listDeleteStep,
  listInitFromArray,
  listInsertStep,
  type ListNode,
} from '../../../../../docs/data-structures/99.visualization/listSteps'

export interface LinkedListVizProps {
  data?: number[]
  title?: string
}

const DEFAULT_DATA = [1, 2, 4, 5]

export function LinkedListViz({ data = DEFAULT_DATA, title }: LinkedListVizProps) {
  const [nodes, setNodes] = useState(() => linkList(listInitFromArray(data)))
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState('')
  const [log, setLog] = useState<string[]>([])

  const handleInsert = () => {
    const v = Number(value)
    if (!Number.isFinite(v)) return
    const step = listInsertStep(nodes, index, v)
    setNodes(step.nodes)
    setValue('')
    setLog(l => [`插入 ${v} @ ${index} (${step.action}): [${step.nodes.map((n: ListNode) => n.val).join('→')}]`, ...l].slice(0, 5))
  }

  const handleDelete = () => {
    if (nodes.length === 0) return
    const step = listDeleteStep(nodes, Math.max(0, Math.min(index, nodes.length - 1)))
    setNodes(step.nodes)
    setLog(l => [`删除 @ ${index} (${step.action}): [${step.nodes.map((n: ListNode) => n.val).join('→') || '(空)'}]`, ...l].slice(0, 5))
  }

  const handleReset = () => {
    setNodes(linkList(listInitFromArray(data)))
    setLog([])
    setIndex(0)
    setValue('')
  }

  return (
    <div className='my-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
      <div className='mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200'>
        {title || '单链表操作可视化'}
      </div>

      <div className='mb-3 flex flex-wrap items-center gap-2 text-xs'>
        <label className='flex items-center gap-1 text-gray-700 dark:text-gray-300'>
          索引
          <input
            type='number'
            min={0}
            max={nodes.length}
            value={index}
            onChange={e => setIndex(Math.max(0, Number(e.target.value) || 0))}
            className='w-16 rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'
          />
        </label>
        <label className='flex items-center gap-1 text-gray-700 dark:text-gray-300'>
          值
          <input
            type='number'
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder='插入值'
            className='w-20 rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'
          />
        </label>
        <button
          onClick={handleInsert}
          className='rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-700'
        >
          插入
        </button>
        <button
          onClick={handleDelete}
          className='rounded bg-red-600 px-2 py-1 text-white hover:bg-red-700'
        >
          删除
        </button>
        <button
          onClick={handleReset}
          className='rounded bg-gray-200 px-2 py-1 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
        >
          ⟲ 重置
        </button>
        <span className='ml-auto text-gray-500 dark:text-gray-400'>长度: {nodes.length}</span>
      </div>

      <div className='flex flex-wrap items-center gap-2 py-3'>
        {nodes.length === 0 ? (
          <div className='text-sm italic text-gray-400'>空链表</div>
        ) : (
          nodes.map((n: ListNode, i: number) => (
            <div key={i} className='flex items-center'>
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white'>
                {n.val}
              </div>
              {i < nodes.length - 1 && <span className='mx-1 text-gray-400'>→</span>}
            </div>
          ))
        )}
        {nodes.length > 0 && <span className='ml-1 text-gray-400'>→ ∅</span>}
      </div>

      {log.length > 0 && (
        <div className='mt-2 border-t border-gray-200 pt-2 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400'>
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LinkedListViz
