import { useEffect, useMemo, useState } from 'react'
import {
  buildTreeFromLevelOrder,
  treeTraverseSteps,
} from '../../../../../docs/data-structures/99.visualization/treeSteps'

export interface BinaryTreeVizProps {
  data?: (number | null)[]
  order?: 'pre' | 'in' | 'post' | 'bfs'
  height?: number
  title?: string
}

const DEFAULT_DATA = [1, 2, 3, 4, 5, 6, 7]
const DEFAULT_ORDER: 'pre' | 'in' | 'post' | 'bfs' = 'pre'

interface Pos {
  val: number
  x: number
  y: number
  left?: Pos
  right?: Pos
}

function layout(root: any, depth: number, left: number, right: number, out: Pos[] = []): Pos | null {
  if (!root) return null
  const x = (left + right) / 2
  const y = 40 + depth * 60
  const pos: Pos = { val: root.val, x, y }
  out.push(pos)
  if (root.left) pos.left = layout(root.left, depth + 1, left, x, out) as Pos
  if (root.right) pos.right = layout(root.right, depth + 1, x, right, out) as Pos
  return pos
}

function collectEdges(p: Pos | undefined, edges: { x1: number; y1: number; x2: number; y2: number }[] = []) {
  if (!p) return edges
  if (p.left) {
    edges.push({ x1: p.x, y1: p.y, x2: p.left.x, y2: p.left.y })
    collectEdges(p.left, edges)
  }
  if (p.right) {
    edges.push({ x1: p.x, y1: p.y, x2: p.right.x, y2: p.right.y })
    collectEdges(p.right, edges)
  }
  return edges
}

export function BinaryTreeViz({
  data = DEFAULT_DATA,
  order = DEFAULT_ORDER,
  height = 320,
  title,
}: BinaryTreeVizProps) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  const root = useMemo(() => buildTreeFromLevelOrder(data), [data])
  const steps = useMemo(() => treeTraverseSteps(root, order), [root, order])
  const positioned = useMemo(() => {
    const out: Pos[] = []
    layout(root, 0, 30, 570, out)
    return { nodes: out, root: out[0] || null }
  }, [root])

  const current = steps[Math.min(step, steps.length - 1)] || { visited: [], current: null }

  const stepForward = () => setStep(s => Math.min(s + 1, steps.length - 1))
  const stepBack = () => setStep(s => Math.max(s - 1, 0))
  const reset = () => {
    setStep(0)
    setPlaying(false)
  }
  const togglePlay = () => {
    if (step >= steps.length - 1) setStep(0)
    setPlaying(p => !p)
  }

  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      if (step >= steps.length - 1) {
        setPlaying(false)
        return
      }
      setStep(s => Math.min(s + 1, steps.length - 1))
    }, 600)
    return () => clearTimeout(t)
  }, [playing, step, steps.length])

  const edges = positioned.root ? collectEdges(positioned.root) : []
  const visitedSet = new Set(current.visited)

  const orderLabel = { pre: '前序', in: '中序', post: '后序', bfs: '层序' }[order]

  return (
    <div className='my-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
      <div className='mb-2 flex items-center justify-between'>
        <div className='text-sm font-semibold text-gray-800 dark:text-gray-200'>
          {title || `二叉树遍历 (${orderLabel})`}
        </div>
        <div className='flex gap-2 text-xs'>
          <button
            onClick={stepBack}
            className='rounded bg-gray-200 px-2 py-1 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
          >
            ◀ 上一步
          </button>
          <button
            onClick={togglePlay}
            className='rounded bg-blue-600 px-2 py-1 text-white hover:bg-blue-700'
          >
            {playing ? '⏸ 暂停' : '▶ 播放'}
          </button>
          <button
            onClick={stepForward}
            className='rounded bg-gray-200 px-2 py-1 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
          >
            下一步 ▶
          </button>
          <button
            onClick={reset}
            className='rounded bg-gray-200 px-2 py-1 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
          >
            ⟲ 重置
          </button>
        </div>
      </div>

      <div className='relative' style={{ height, width: '100%' }}>
        <svg viewBox='0 0 600 320' className='h-full w-full' preserveAspectRatio='xMidYMid meet'>
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke='currentColor'
              strokeWidth={2}
              className='text-gray-400 dark:text-gray-500'
            />
          ))}
          {positioned.nodes.map(n => {
            const isCurrent = current.current === n.val
            const isVisited = visitedSet.has(n.val)
            let fill = '#f3f4f6'
            let stroke = '#9ca3af'
            if (isVisited) {
              fill = '#86efac'
              stroke = '#16a34a'
            }
            if (isCurrent) {
              fill = '#fde047'
              stroke = '#ca8a04'
            }
            return (
              <g key={`${n.x}-${n.y}-${n.val}`}>
                <circle cx={n.x} cy={n.y} r={20} fill={fill} stroke={stroke} strokeWidth={2} />
                <text x={n.x} y={n.y + 5} textAnchor='middle' className='fill-gray-900 text-sm font-semibold'>
                  {n.val}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className='mt-2 flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400'>
        <span className='flex items-center gap-1'>
          <span className='inline-block h-3 w-3 rounded-full bg-green-300'></span>已访问
        </span>
        <span className='flex items-center gap-1'>
          <span className='inline-block h-3 w-3 rounded-full bg-yellow-300'></span>当前节点
        </span>
        <span className='ml-auto'>
          步 {step + 1} / {steps.length} · 访问顺序: [{current.visited.join(', ')}]
        </span>
      </div>
    </div>
  )
}

export default BinaryTreeViz
