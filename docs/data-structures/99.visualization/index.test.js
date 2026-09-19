import { describe, it, expect } from 'vitest'
import { bubbleSortSteps, quickSortSteps } from './sortSteps'
import { binarySearchSteps, linearSearchSteps } from './searchSteps'
import { buildTreeFromLevelOrder, treeTraverseSteps } from './treeSteps'
import {
  listInitFromArray,
  linkList,
  listInsertStep,
  listDeleteStep,
} from './listSteps'

describe('sortSteps', () => {
  it('bubbleSortSteps produces sorted final array', () => {
    const steps = bubbleSortSteps([5, 3, 1, 4, 2])
    const last = steps[steps.length - 1].array
    expect(last).toEqual([1, 2, 3, 4, 5])
  })

  it('bubbleSortSteps empty input', () => {
    const steps = bubbleSortSteps([])
    expect(steps[0].array).toEqual([])
    expect(steps[steps.length - 1].array).toEqual([])
  })

  it('bubbleSortSteps single element', () => {
    const steps = bubbleSortSteps([7])
    expect(steps[steps.length - 1].array).toEqual([7])
  })

  it('quickSortSteps produces sorted final array', () => {
    const steps = quickSortSteps([8, 3, 1, 6, 2, 7, 4, 5])
    const last = steps[steps.length - 1].array
    expect(last).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })

  it('quickSortSteps empty input', () => {
    const steps = quickSortSteps([])
    expect(steps[0].array).toEqual([])
  })
})

describe('searchSteps', () => {
  it('binarySearchSteps finds target', () => {
    const steps = binarySearchSteps([1, 3, 5, 7, 9, 11, 13], 7)
    expect(steps[steps.length - 1].found).toBe(true)
  })

  it('binarySearchSteps returns not found', () => {
    const steps = binarySearchSteps([1, 3, 5, 7, 9], 100)
    expect(steps[steps.length - 1].found).toBe(false)
  })

  it('linearSearchSteps finds target', () => {
    const steps = linearSearchSteps([10, 20, 30], 20)
    expect(steps[steps.length - 1].found).toBe(true)
  })

  it('linearSearchSteps returns not found', () => {
    const steps = linearSearchSteps([10, 20, 30], 40)
    expect(steps[steps.length - 1].found).toBe(false)
  })
})

describe('treeSteps', () => {
  it('buildTreeFromLevelOrder simple tree', () => {
    const root = buildTreeFromLevelOrder([1, 2, 3, 4, 5, 6, 7])
    expect(root.val).toBe(1)
    expect(root.left.val).toBe(2)
    expect(root.right.val).toBe(3)
    expect(root.left.left.val).toBe(4)
  })

  it('buildTreeFromLevelOrder null values', () => {
    const root = buildTreeFromLevelOrder([1, null, 2, null, null, 3])
    expect(root.val).toBe(1)
    expect(root.left).toBeNull()
    expect(root.right.val).toBe(2)
    expect(root.right.left.val).toBe(3)
  })

  it('treeTraverseSteps preorder', () => {
    const root = buildTreeFromLevelOrder([1, 2, 3, 4, 5])
    const steps = treeTraverseSteps(root, 'pre')
    expect(steps[steps.length - 1].visited).toEqual([1, 2, 4, 5, 3])
  })

  it('treeTraverseSteps inorder', () => {
    const root = buildTreeFromLevelOrder([1, 2, 3, 4, 5])
    const steps = treeTraverseSteps(root, 'in')
    expect(steps[steps.length - 1].visited).toEqual([4, 2, 5, 1, 3])
  })

  it('treeTraverseSteps postorder', () => {
    const root = buildTreeFromLevelOrder([1, 2, 3, 4, 5])
    const steps = treeTraverseSteps(root, 'post')
    expect(steps[steps.length - 1].visited).toEqual([4, 5, 2, 3, 1])
  })

  it('treeTraverseSteps bfs', () => {
    const root = buildTreeFromLevelOrder([1, 2, 3, 4, 5, 6, 7])
    const steps = treeTraverseSteps(root, 'bfs')
    expect(steps[steps.length - 1].visited).toEqual([1, 2, 3, 4, 5, 6, 7])
  })
})

describe('listSteps', () => {
  it('listInitFromArray + linkList', () => {
    const nodes = listInitFromArray([1, 2, 3])
    linkList(nodes)
    expect(nodes[0].val).toBe(1)
    expect(nodes[0].next.val).toBe(2)
    expect(nodes[2].next).toBeNull()
  })

  it('listInsertStep head', () => {
    const nodes = linkList(listInitFromArray([2, 3, 4]))
    const step = listInsertStep(nodes, 0, 1)
    expect(step.nodes.map(n => n.val)).toEqual([1, 2, 3, 4])
    expect(step.action).toBe('insert-head')
  })

  it('listInsertStep middle', () => {
    const nodes = linkList(listInitFromArray([1, 2, 4]))
    const step = listInsertStep(nodes, 2, 3)
    expect(step.nodes.map(n => n.val)).toEqual([1, 2, 3, 4])
    expect(step.action).toBe('insert-middle')
  })

  it('listInsertStep tail', () => {
    const nodes = linkList(listInitFromArray([1, 2, 3]))
    const step = listInsertStep(nodes, 3, 4)
    expect(step.nodes.map(n => n.val)).toEqual([1, 2, 3, 4])
    expect(step.action).toBe('insert-tail')
  })

  it('listDeleteStep middle', () => {
    const nodes = linkList(listInitFromArray([1, 2, 3, 4]))
    const step = listDeleteStep(nodes, 2)
    expect(step.nodes.map(n => n.val)).toEqual([1, 2, 4])
    expect(step.action).toBe('delete-middle')
  })
})
