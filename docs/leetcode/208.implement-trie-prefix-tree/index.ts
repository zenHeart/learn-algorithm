var Trie = function () {
  this.root = {
    children: {},
    isEndOfWord: false,
  }
}

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let curPos = this.root
  for (let i = 0; i < word.length; i++) {
    let c = word[i]
    if (curPos.children[c]) {
      curPos = curPos.children[c]
    } else {
      curPos.children[c] = {
        children: {},
        isEndOfWord: false,
      }
      curPos = curPos.children[c]
    }
  }
  // 标记单词结束
  curPos.isEndOfWord = true
}

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let curPos = this.root
  for (let i = 0; i < word.length; i++) {
    if (curPos.children[word[i]]) {
      curPos = curPos.children[word[i]]
    } else {
      return false
    }
  }
  return curPos.isEndOfWord
}

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let curPos = this.root
  for (let i = 0; i < prefix.length; i++) {
    if (curPos.children[prefix[i]]) {
      curPos = curPos.children[prefix[i]]
    } else {
      return false
    }
  }
  return true
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

export default Trie
