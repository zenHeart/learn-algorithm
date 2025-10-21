import { describe, it, expect } from 'vitest'
import Trie from './index'

describe('Trie', () => {
  it('LeetCode example', () => {
    const trie = new Trie()
    trie.insert('apple')
    expect(trie.search('apple')).toBe(true) // 返回 True
    expect(trie.search('app')).toBe(false) // 返回 False
    expect(trie.startsWith('app')).toBe(true) // 返回 True
    trie.insert('app')
    expect(trie.search('app')).toBe(true) // 返回 True
  })

  it('Empty trie', () => {
    const trie = new Trie()
    expect(trie.search('')).toBe(false)
    expect(trie.startsWith('')).toBe(true) // 空前缀始终为 true
  })

  it('Prefix and word overlap', () => {
    const trie = new Trie()
    trie.insert('a')
    trie.insert('ab')
    expect(trie.search('a')).toBe(true)
    expect(trie.search('ab')).toBe(true)
    expect(trie.startsWith('a')).toBe(true)
    expect(trie.startsWith('ab')).toBe(true)
    expect(trie.startsWith('abc')).toBe(false)
  })

  it('Case sensitivity', () => {
    const trie = new Trie()
    trie.insert('Apple')
    expect(trie.search('apple')).toBe(false)
    expect(trie.search('Apple')).toBe(true)
    expect(trie.startsWith('App')).toBe(true)
    expect(trie.startsWith('app')).toBe(false)
  })
})
