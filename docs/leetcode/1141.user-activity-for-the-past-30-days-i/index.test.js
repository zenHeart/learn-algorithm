
import func from './index.js';
import { runTestSuite } from '../utils/autoRunTest.js'

const testData = {
  'plus one': {
    'empty': [[[]], [1], func],
    'value1': [[[9, 9, 9]], [1, 0, 0, 0], func],
    'value2': [[[9, 1, 9]], [9, 2, 0], func],
  }
}

runTestSuite(testData)
