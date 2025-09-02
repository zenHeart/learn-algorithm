import Trie from '../Trie.ts'

class MagicDictionary extends Trie {
  buildDict(dics: string[]) {
    this.root = Trie.build(dics)
  }
  override search(word: string): boolean {
    const res: string[] = []
    const root = this.root
    function backtracking(path = '', modifyTimes = 0, curPos = root): void {
      // 1. 结果规则，如果存在只需修改一次就和 word 相同推入这个结果
      if (path.length === word.length && modifyTimes === 1) {
        res.push(path)
      }

      let nextL = word[path.length]

      // 循环到当前层
      for (const l in curPos.children) {
        if (l === nextL && modifyTimes <= 1) {
          backtracking(path + l, modifyTimes, curPos?.children[l])
        }
        if (l !== nextL && modifyTimes < 1) {
          backtracking(path + l, modifyTimes + 1, curPos?.children[l])
        }
      }
    }
    backtracking()
    console.log(res)
    return res.length > 0
  }
}

const magicDictionary = new MagicDictionary()

magicDictionary.buildDict(['hello', 'world', 'ban', 'bar'])

magicDictionary.search('baz') // 返回 false
magicDictionary.search('hhllo') // 返回 true
magicDictionary.search('hell1') // 返回 false
magicDictionary.search('worla') // 返回 false
magicDictionary.search('zorld') // 返回 false
magicDictionary.search('world1') // 返回 false
