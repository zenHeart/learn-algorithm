export interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

export interface TreeStep {
  visited: number[]
  current: number
}

export function buildTreeFromLevelOrder(arr: (number | null)[]): TreeNode | null
export function treeTraverseSteps(root: TreeNode | null, order?: 'pre' | 'in' | 'post' | 'bfs'): TreeStep[]
