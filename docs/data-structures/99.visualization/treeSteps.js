// 二叉树遍历可视化：基于层序数组（null 表示空位）生成 BFS / DFS（先/中/后序）步骤

export function buildTreeFromLevelOrder(arr) {
  if (!arr || arr.length === 0 || arr[0] == null) return null
  const nodes = arr.map(v => (v == null ? null : { val: v, left: null, right: null }))
  const root = nodes[0]
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    if (!n) continue
    const li = 2 * i + 1
    const ri = 2 * i + 2
    if (li < nodes.length) n.left = nodes[li]
    if (ri < nodes.length) n.right = nodes[ri]
  }
  return root
}

export function treeTraverseSteps(root, order = 'pre') {
  const steps = []
  const path = []
  function visit(node) {
    if (!node) return
    if (order === 'pre') {
      path.push(node.val)
      steps.push({ visited: path.slice(), current: node.val })
      visit(node.left)
      visit(node.right)
    } else if (order === 'in') {
      visit(node.left)
      path.push(node.val)
      steps.push({ visited: path.slice(), current: node.val })
      visit(node.right)
    } else if (order === 'post') {
      visit(node.left)
      visit(node.right)
      path.push(node.val)
      steps.push({ visited: path.slice(), current: node.val })
    } else if (order === 'bfs') {
      // BFS 在外部统一处理
    }
  }
  if (order === 'bfs') {
    const queue = root ? [root] : []
    while (queue.length) {
      const n = queue.shift()
      path.push(n.val)
      steps.push({ visited: path.slice(), current: n.val })
      if (n.left) queue.push(n.left)
      if (n.right) queue.push(n.right)
    }
  } else {
    visit(root)
  }
  return steps
}
