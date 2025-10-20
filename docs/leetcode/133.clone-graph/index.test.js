
import answer from './index.js'
import testCases from './fixture.js'
import { describe, it, expect } from 'vitest'

describe('clone-graph', () => {
  testCases.forEach((testData, index) => {
    it(`${testData.describe || index + '.clone-graph'}`, () => {
      let res = answer.apply(null, testData.input)
      expect(res).toEqual(testData.expect)
    })
  })
})
