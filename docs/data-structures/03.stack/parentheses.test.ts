import { runTestSuite, TEST_SUITE } from '../utils/autoRunTest.ts'
import isValid from './parentheses.ts'

const testData: TEST_SUITE = {
  isValid: {
    'one pair': [[isValid('()')], true],
    'one pair not valid': [[isValid(')(')], false],
    'multiple pairs': [[isValid('()()')], true],
    'nested pairs': [[isValid('(())')], true],
    'complex valid': [[isValid('(()())')], true],
    'complex not valid': [[isValid('(()))(')], false],
    'empty string': [[isValid('')], true],
  },
}

runTestSuite(testData)
