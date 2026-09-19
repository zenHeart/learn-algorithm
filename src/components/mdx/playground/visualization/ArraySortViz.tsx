import { useEffect, useMemo, useState } from 'react'
import { bubbleSortSteps, quickSortSteps } from '../../../../../docs/data-structures/99.visualization/sortSteps'

export interface ArraySortVizProps {
  data?: number[]
  algorithm?: 'bubble' | 'quick'
  height?: number
  title?: string
}

const DEFAULT_DATA = [5, 3, 8, 1, 7, 2, 6, 4]

export function ArraySortViz({ data = DEFAULT_DATA, algorithm = 'bubble', height = 220, title }: ArraySortVizProps) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  const steps = useMemo(() => {
    return algorithm === 'bubble' ? bubbleSortSteps(data) : quickSortSteps(data)
  }, [data, algorithm])

  const current = steps[Math.min(step, steps.length - 1)] || { array: data, compare: [], swap: [], sorted: [] }
  const max = Math.max(...current.array, 1)

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

  // 自动播放：350ms 一步
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => {
      if (step >= steps.length - 1) {
        setPlaying(false)
        return
      }
      setStep(s => Math.min(s + 1, steps.length - 1))
    }, 350)
    return () => clearTimeout(t)
  }, [playing, step, steps.length])

  return (
    <div className='my-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
      <div className='mb-2 flex items-center justify-between'>
        <div className='text-sm font-semibold text-gray-800 dark:text-gray-200'>
          {title || `数组排序可视化 (${algorithm === 'bubble' ? '冒泡' : '快速'})`}
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

      <div className='relative' style={{ height }}>
        <div className='flex h-full items-end justify-between gap-1'>
          {current.array.map((v: number, i: number) => {
            const isCompare = current.compare?.includes(i)
            const isSwap = current.swap?.includes(i)
            const isSorted = current.sorted?.includes(i)
            const isPivot = current.pivot === i
            const h = (v / max) * (height - 30)
            let bg = 'bg-gray-400 dark:bg-gray-500'
            if (isSorted) bg = 'bg-green-500'
            else if (isPivot) bg = 'bg-purple-500'
            else if (isSwap) bg = 'bg-red-500'
            else if (isCompare) bg = 'bg-yellow-400'
            return (
              <div
                key={i}
                className={`flex-1 ${bg} relative rounded-t transition-all duration-200`}
                style={{ height: h }}
                title={`索引 ${i}: 值 ${v}`}
              >
                <span className='absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-700 dark:text-gray-300'>
                  {v}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className='mt-2 flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400'>
        <span className='flex items-center gap-1'>
          <span className='inline-block h-3 w-3 rounded bg-yellow-400'></span>比较
        </span>
        <span className='flex items-center gap-1'>
          <span className='inline-block h-3 w-3 rounded bg-red-500'></span>交换
        </span>
        <span className='flex items-center gap-1'>
          <span className='inline-block h-3 w-3 rounded bg-purple-500'></span>基准
        </span>
        <span className='flex items-center gap-1'>
          <span className='inline-block h-3 w-3 rounded bg-green-500'></span>已排序
        </span>
        <span className='ml-auto'>
          步 {step + 1} / {steps.length}
        </span>
      </div>
    </div>
  )
}

export default ArraySortViz
