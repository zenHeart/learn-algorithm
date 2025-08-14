import Trie from '../Trie.ts'

function replaceWords(prefixDics: string[], sentence: string): string {
  const trie = new Trie()
  // 创建字典树
  prefixDics.forEach(trie.insert.bind(trie))
  let res = ''
  let word = ''
  for (let j = 0; j < sentence.length; j++) {
    const l = sentence[j]
    const codeL = l.codePointAt(0) || 0

    // 如果是字母, 持续读取直到拼接为单词
    if ((codeL >= 65 && codeL <= 90) || (codeL >= 97 && codeL <= 122)) {
      word += l
    } else {
      // 截取到单词
      if (word.length) {
        // 如果找到前缀树匹配
        const prefix = trie.getPrefix(word)
        if (prefix) {
          res += prefix
        } else {
          res += word
        }
      }
      // 1. 易错点任何时候都需拼接非字母
      res += l
      // 2. 易错点忽略单词处理完后的重置
      word = ''
    }
  }
  // 3. 易错点忽略处理最后一个单词
  if (word.length) {
    const prefix = trie.getPrefix(word)
    if (prefix) {
      res += prefix
    } else {
      res += word
    }
  }
  return res
}

console.log(replaceWords([], 'the cattle was rattled by the battery'))
console.log('demo')
console.log(
  replaceWords(['cat', 'bat', 'rat'], 'the cattle was rattled by the battery')
)
