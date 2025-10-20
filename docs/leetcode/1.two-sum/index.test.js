
import func from './index.js'
import { runTestSuite } from '../utils/autoRunTest.js'

const testData = {
  'two sum': {
    'case 1': [[[1, 2, 3], 3], [0, 1], func],
    'case 2': [[[0, 4, 3, 0], 0], [0, 3], func],
    'case 3': [[[-3, 4, 3, 90], 0], [0, 2], func],
  }
}

runTestSuite(testData)
