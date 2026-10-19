export interface SearchStep {
  array: number[]
  lo?: number
  hi?: number
  mid?: number
  current?: number
  found: boolean
}

export function binarySearchSteps(arr: number[], target: number): SearchStep[]
export function linearSearchSteps(arr: number[], target: number): SearchStep[]
