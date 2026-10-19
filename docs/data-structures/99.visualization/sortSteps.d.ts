export interface SortStep {
  array: number[]
  pivot?: number | null
  compare: number[]
  swap: number[]
  sorted: number[]
}

export function bubbleSortSteps(input: number[]): SortStep[]
export function quickSortSteps(input: number[]): SortStep[]
