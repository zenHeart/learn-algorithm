
import func from './index.js';
import { runTestSuite } from '../utils/autoRunTest.js'

const testData = {
  'normal': {
    'hasValue': [[[5, 7, 7, 8, 8, 10], 8], [3, 4], func],
    'notFound': [[[5, 7, 7, 8, 8, 10], 6], [-1, -1], func],
    'empty': [[[], 0], [-1, -1], func],
  },
}

runTestSuite(testData)
