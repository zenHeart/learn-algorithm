
import LRUCache from './index.js'
import { describe, it, expect } from 'vitest'

describe('lru test', () => {
  it('basic test', () => {
    let cache = new LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    expect(cache.get(1)).toBe(1)
    cache.put(3, 3)
    expect(cache.get(3)).toBe(3)
    expect(cache.get(2)).toBe(-1)
    cache.put(4, 4)
    expect(cache.get(1)).toBe(-1)
    expect(cache.get(3)).toBe(3)
    expect(cache.get(4)).toBe(4)
  })
  it('empty test', () => {
    let cache = new LRUCache(2)
    let testData = {
      input: [
        ['get', 'put', 'get', 'put', 'put', 'get', 'get'],
        [[2], [2, 6], [1], [1, 5], [1, 2], [1], [2]],
      ],
      expect: [-1, null, -1, null, null, 2, 6],
    }
    testData.input[0].forEach((operation, index) => {
      let res = cache[operation].apply(cache, testData.input[1][index])
      expect(res).toBe(testData.expect[index])
    })
  })
})
