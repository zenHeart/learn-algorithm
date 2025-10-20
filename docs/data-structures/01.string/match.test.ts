import { runTestSuite, TEST_SUITE } from '../utils/autoRunTest.ts'
import match from './match.ts'

const testData: TEST_SUITE = {
  match: {
    'full match': [['hello world', 'world'], 6, match],
    'no match': [['hello world', 'abc'], null, match],
    'match at start': [['abcde', 'ab'], 0, match],
    'match at middle': [['abcde', 'cd'], 2, match],
    'match at end': [['abcde', 'de'], 3, match],
    'empty pattern': [['abcde', ''], 0, match],
    'empty string': [['', 'a'], null, match],
    'both empty': [['', ''], 0, match],
    // 新增：重叠匹配场景
    'overlap match 1': [['aaaab', 'aab'], 2, match],
    'overlap match 2': [['ababab', 'bab'], 1, match],
    'overlap match 3': [['mississippi', 'issi'], 1, match],
  },
}

runTestSuite(testData)
