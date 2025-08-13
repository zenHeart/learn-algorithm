interface PrefixNodeI {
  children: Record<string, PrefixNodeI>
  isEndOfWord: boolean
  value: string
}

class PrefixNode implements PrefixNodeI {
  children: Record<string, PrefixNodeI> = {}
  isEndOfWord: boolean = false
  value: string = ''
  constructor(value: string = '') {
    this.value = value
  }
}

class PrefixTree {
  root: PrefixNode = new PrefixNode()
  insert(str: string) {
    let curPos = this.root
    for (let i = 0; i < str.length; i++) {
      const l = str[i]
      if (curPos.children[l]) {
        curPos = curPos.children[l]
      } else {
        curPos.children[l] = new PrefixNode(l)
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
      if (curPos.children[l]) {
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
      if (curPos.children[l]) {
        curPos = curPos.children[l]
      } else {
        return false
      }
    }
    // 这里是前缀匹配所以不用判断是不是单词
    return true
  }
}

const prefixTree = new PrefixTree()
prefixTree.insert('hello')
prefixTree.insert('helium')
prefixTree.insert('hero')
console.log(prefixTree.root)

console.log(prefixTree.search('hello')) // true
console.log(prefixTree.search('helium')) // true
console.log(prefixTree.search('hel')) // false
console.log(prefixTree.search('c')) // false

console.log(prefixTree.startWith('hello')) // true
console.log(prefixTree.startWith('helium')) // true
console.log(prefixTree.startWith('hel')) // true
console.log(prefixTree.startWith('c')) // false
console.log(prefixTree.startWith('h')) // false
