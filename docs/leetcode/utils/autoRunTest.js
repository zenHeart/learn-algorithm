import { describe, it, expect } from 'vitest'

/**
 * @typedef {(...args: any[]) => any} TransformFunc
 * @typedef {[any[]|any, any, TransformFunc?]|Function} TEST_UNIT
 * @typedef {{ [suiteName: string]: { [unitName: string]: TEST_UNIT } }} TEST_SUITE
 */

/**
 * @param {TEST_SUITE} testSuites
 */
export function runTestSuite(testSuites) {
   for (const suiteName in testSuites) {
      describe(suiteName, () => {
         const testUnites = testSuites[suiteName]
         for (const unitName in testUnites) {
            const testUnite = testUnites[unitName]
            if (typeof testUnite === 'function') {
               it(unitName, testUnite)
            } else {
               it(unitName, () => {
                  const testData = testUnite[0]
                  if (typeof testUnite[2] === 'function') {
                     expect(
                        testUnite[2](
                           ...(Array.isArray(testData) ? testData : [testData])
                        )
                     ).toEqual(testUnite[1])
                  } else {
                     expect(
                        ...(Array.isArray(testData) ? testData : [testData])
                     ).toEqual(testUnite[1])
                  }
               })
            }
         }
      })
   }
}

export function arrayToList(arr) {
   let head
   for (let i = 0; i < arr.length; i++) {
      const val = arr[i]
      const node = {
         val,
         next: null
      }
      if (i === 0) {
         head = node
         moveP = head
      } else {
         moveP.next = node
         moveP = node
      }
   }
   return head
}

export default runTestSuite;
