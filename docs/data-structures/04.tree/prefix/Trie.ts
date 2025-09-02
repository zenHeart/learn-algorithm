interface ITrieNode {
  children?: Record<string, ITrieNode>
  isEndOfWord: boolean
}

class TrieNode implements ITrieNode {
  children?: Record<string, ITrieNode>
  isEndOfWord: boolean = false
}

class Trie {
  static TrieNode = TrieNode
  root: TrieNode = new TrieNode()

  static build(dics: string[]): TrieNode {
    const trie = new Trie()
    dics.forEach(trie.insert.bind(trie))
    return trie.root
  }

  insert(str: string) {
    let curPos = this.root
    for (let i = 0; i < str.length; i++) {
      const l = str[i]
      if (curPos.children?.[l]) {
        curPos = curPos.children[l]
      } else {
        curPos.children = curPos.children || {}
        curPos.children[l] = new TrieNode()
        curPos = curPos.children[l]
      }
      // 标记为单词
      if (i === str.length - 1) {
        curPos.isEndOfWord = true
      }
    }
  }
  search(str: string): boolean {
    let curPos = this.root
    for (let i = 0; i < str.length; i++) {
      const l = str[i]
      if (curPos.children?.[l]) {
        curPos = curPos.children[l]
      } else {
        return false
      }
    }
    // 这个地方容易出错可能是其他单词的中间路径，并没有存储这个单词
    return curPos.isEndOfWord
  }

  startWith(str: string): boolean {
    let curPos = this.root
    for (let i = 0; i < str.length; i++) {
      const l = str[i]
      if (curPos.children?.[l]) {
        curPos = curPos.children[l]
      } else {
        return false
      }
    }
    return true
  }
  /**
   * 证明单词的前缀在前缀树中存在匹配
   * @param str
   */
  getPrefix(str: string): boolean | string {
    let curPost = this.root
    let prefix = ''

    for (let i = 0; i < str.length; i++) {
      const l = str[i]
      if (curPost.children?.[l]) {
        prefix += l
        if (curPost.children?.[l]?.isEndOfWord) {
          return prefix
        } else {
          curPost = curPost.children[l]
        }
      } else {
        return false
      }
    }
    return false
  }
}

// const trie = new Trie()
// trie.insert('hello')
// trie.insert('helium')
// trie.insert('hero')
// console.log(trie.getPrefix('hero111'))
// console.log(JSON.stringify(trie.root, null, 2))

// console.log(trie.search('hello')) // true
// console.log(trie.search('helium')) // true
// console.log(trie.search('hel')) // false
// console.log(trie.search('c')) // false

// console.log(trie.startWith('hello')) // true
// console.log(trie.startWith('helium')) // true
// console.log(trie.startWith('hel')) // true
// console.log(trie.startWith('c')) // false
// console.log(trie.startWith('h')) // false
export default Trie
