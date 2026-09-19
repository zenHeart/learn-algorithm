import { useEffect, useMemo, useState } from 'react'
import { binarySearchSteps, linearSearchSteps } from '../../../../../docs/data-structures/99.visualization/searchSteps'

export interface BinarySearchVizProps {
  data?: number[]
  target?: number
  algorithm?: 'binary' | 'linear'
  height?: number
  title?: string
}

const DEFAULT_DATA = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
const DEFAULT_TARGET = 11

export function BinarySearchViz({
  data = DEFAULT_DATA,
  target = DEFAULT_TARGET,
  algorithm = 'binary',
  height = 160,
  title,
}: BinarySearchVizProps) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  const steps = useMemo(() => {
    const sorted = algorithm === 'binary' ? [...data].sort((a, b) => a - b) : data
    return algorithm === 'binary'
      ? binarySearchSteps(sorted, target)
      : linearSearchSteps(sorted, target)
  }, [data, target, algorithm])

  const current = steps[Math.min(step, steps.length - 1)] || { array: data, found: false }
  const arr = current.array

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

  const cellW = 100 / arr.length

  return (
    <div className='my-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900'>
      <div className='mb-2 flex items-center justify-between'>
        <div className='text-sm font-semibold text-gray-800 dark:text-gray-200'>
          {title || `查找可视化 (${algorithm === 'binary' ? '二分' : '线性'}, 目标 ${target})`}
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
        <div className='flex h-full items-center justify-between gap-1'>
          {arr.map((v: number, i: number) => {
            const inRange =
              algorithm === 'binary' && current.lo != null && current.hi != null && i >= current.lo && i <= current.hi
            const isMid = current.mid === i
            const isCurrent = current.current === i
            let bg = 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            if (inRange) bg = 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
            if (isMid || isCurrent) bg = 'bg-yellow-300 text-gray-900'
            return (
              <div
                key={i}
                className={`relative flex-1 ${bg} flex h-12 items-center justify-center rounded text-sm font-semibold transition-all duration-200`}
                style={{ width: `${cellW}%` }}
                title={`索引 ${i}: 值 ${v}`}
              >
                {v}
                {isMid && (
                  <span className='absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-yellow-700 dark:text-yellow-300'>
                    mid
                  </span>
                )}
                {isCurrent && algorithm === 'linear' && (
                  <span className='absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-yellow-700 dark:text-yellow-300'>
                    i
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className='mt-2 flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400'>
        <span className='flex items-center gap-1'>
          <span className='inline-block h-3 w-3 rounded bg-blue-100 dark:bg-blue-900'></span>当前区间
        </span>
        <span className='flex items-center gap-1'>
          <span className='inline-block h-3 w-3 rounded bg-yellow-300'></span>中点 / 当前
        </span>
        <span className='ml-auto'>
          步 {step + 1} / {steps.length} ·{' '}
          {current.found ? (
            <span className='text-green-600 dark:text-green-400'>找到</span>
          ) : step === steps.length - 1 ? (
            <span className='text-red-600 dark:text-red-400'>未找到</span>
          ) : (
            <span>搜索中</span>
          )}
        </span>
      </div>
    </div>
  )
}

export default BinarySearchViz
