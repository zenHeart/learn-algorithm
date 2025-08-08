import { runTestSuite, TEST_SUITE } from '../utils/autoRunTest.ts'
import parenthesesMatch from './parenthesesMatch.ts'

const testData: TEST_SUITE = {
  isValid: {
    'one pair': [[parenthesesMatch('()')], '()'],
    'one left': [[parenthesesMatch('(')], '()'],
    'one right': [[parenthesesMatch(')')], '不匹配'],
    'multiple pairs': [[parenthesesMatch('()()')], '()()'],
    'nested pairs': [[parenthesesMatch('(()')], '(())'],
    'complex valid': [[parenthesesMatch('(()())')], '(()())'],
    'complex not valid': [[parenthesesMatch('(()))(')], '不匹配'],
    'empty string': [[parenthesesMatch('')], ''],
  },
}

runTestSuite(testData)
