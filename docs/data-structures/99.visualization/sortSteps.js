// 排序可视化：生成逐步动画帧
// 输出每一步的数组快照与高亮索引（compare / swap / sorted）

export function bubbleSortSteps(input) {
  const arr = input.slice()
  const steps = [{ array: arr.slice(), compare: [], swap: [], sorted: [] }]
  const sorted = new Set()
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({ array: arr.slice(), compare: [j, j + 1], swap: [], sorted: [...sorted] })
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swapped = true
        steps.push({ array: arr.slice(), compare: [], swap: [j, j + 1], sorted: [...sorted] })
      }
    }
    sorted.add(n - 1 - i)
    if (!swapped) {
      for (let k = 0; k < n - 1 - i; k++) sorted.add(k)
      break
    }
  }
  sorted.add(0)
  steps.push({ array: arr.slice(), compare: [], swap: [], sorted: [...sorted] })
  return steps
}

export function quickSortSteps(input) {
  const arr = input.slice()
  const steps = []
  steps.push({ array: arr.slice(), pivot: null, compare: [], swap: [], sorted: [] })
  const sorted = new Set()

  function partition(lo, hi) {
    const pivot = arr[hi]
    steps.push({ array: arr.slice(), pivot: hi, compare: [], swap: [], sorted: [...sorted] })
    let i = lo - 1
    for (let j = lo; j < hi; j++) {
      steps.push({ array: arr.slice(), pivot: hi, compare: [j], swap: [], sorted: [...sorted] })
      if (arr[j] <= pivot) {
        i++
        if (i !== j) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          steps.push({ array: arr.slice(), pivot: hi, compare: [], swap: [i, j], sorted: [...sorted] })
        }
      }
    }
    if (i + 1 !== hi) {
      ;[arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]
      steps.push({ array: arr.slice(), pivot: null, compare: [], swap: [i + 1, hi], sorted: [...sorted] })
    }
    sorted.add(i + 1)
    return i + 1
  }

  function qs(lo, hi) {
    if (lo < hi) {
      const p = partition(lo, hi)
      qs(lo, p - 1)
      qs(p + 1, hi)
    } else if (lo === hi) {
      sorted.add(lo)
    }
  }

  qs(0, arr.length - 1)
  steps.push({ array: arr.slice(), pivot: null, compare: [], swap: [], sorted: [...sorted] })
  return steps
}
