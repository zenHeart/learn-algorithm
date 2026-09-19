// 搜索可视化：生成每一步的搜索区间

export function binarySearchSteps(arr, target) {
  const steps = []
  let lo = 0
  let hi = arr.length - 1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    steps.push({ array: arr.slice(), lo, hi, mid, found: arr[mid] === target })
    if (arr[mid] === target) return steps
    if (arr[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  steps.push({ array: arr.slice(), lo: -1, hi: -1, mid: -1, found: false })
  return steps
}

export function linearSearchSteps(arr, target) {
  const steps = []
  for (let i = 0; i < arr.length; i++) {
    steps.push({ array: arr.slice(), current: i, found: arr[i] === target })
    if (arr[i] === target) return steps
  }
  steps.push({ array: arr.slice(), current: -1, found: false })
  return steps
}
