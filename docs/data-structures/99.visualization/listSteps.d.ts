export interface ListNode {
  val: number
  next: ListNode | null
}

export interface ListStep {
  nodes: ListNode[]
  highlight: number
  action: string
}

export function listInitFromArray(arr: number[]): ListNode[]
export function linkList(nodes: ListNode[]): ListNode[]
export function listInsertStep(nodes: ListNode[], index: number, value: number): ListStep
export function listDeleteStep(nodes: ListNode[], index: number): ListStep
