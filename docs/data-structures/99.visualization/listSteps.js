// 链表操作可视化：单链表增删改查的逐步状态

export function listInitFromArray(arr) {
  return arr.map(v => ({ val: v, next: null }))
}

export function linkList(nodes) {
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1]
  if (nodes.length) nodes[nodes.length - 1].next = null
  return nodes
}

function cloneAndRelink(nodes) {
  const arr = nodes.map(n => ({ val: n.val, next: null }))
  linkList(arr)
  return arr
}

export function listInsertStep(nodes, index, value) {
  const arr = cloneAndRelink(nodes)
  const newNode = { val: value, next: null }
  if (index <= 0) {
    newNode.next = arr[0] || null
    return { nodes: [newNode, ...arr], highlight: 0, action: 'insert-head' }
  }
  if (index >= arr.length) {
    if (arr.length === 0) return { nodes: [newNode], highlight: 0, action: 'insert-tail' }
    newNode.next = arr[arr.length - 1].next
    arr[arr.length - 1].next = newNode
    arr.push(newNode)
    return { nodes: arr, highlight: arr.length - 1, action: 'insert-tail' }
  }
  newNode.next = arr[index]
  arr[index - 1].next = newNode
  arr.splice(index, 0, newNode)
  return { nodes: arr, highlight: index, action: 'insert-middle' }
}

export function listDeleteStep(nodes, index) {
  const arr = cloneAndRelink(nodes)
  if (arr.length === 0) return { nodes: [], highlight: -1, action: 'delete-empty' }
  if (index <= 0) {
    arr.shift()
    return { nodes: arr, highlight: 0, action: 'delete-head' }
  }
  if (index >= arr.length) {
    arr.pop()
    if (arr.length) arr[arr.length - 1].next = null
    return { nodes: arr, highlight: arr.length - 1, action: 'delete-tail' }
  }
  arr[index - 1].next = arr[index].next
  arr.splice(index, 1)
  return { nodes: arr, highlight: index, action: 'delete-middle' }
}
