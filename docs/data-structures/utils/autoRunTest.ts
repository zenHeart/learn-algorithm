import { describe, it, expect } from 'vitest'

type TransformFunc = (...args: unknown[]) => unknown
type TEST_UNIT =
  | [testData: unknown[] | unknown, expect: unknown, transform?: TransformFunc]
  | Function

export interface TEST_SUITE {
  [suiteName: string]: {
    [unitName: string]: TEST_UNIT
  }
}

export function runTestSuite(testSuites: TEST_SUITE) {
  for (const suiteName in testSuites) {
    describe(suiteName, () => {
      const testUnites = testSuites[suiteName]
      for (const unitName in testUnites) {
        const testUnite = testUnites[unitName]

        if (typeof testUnite === 'function') {
          // @ts-ignore
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
