/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function v2(strs) {
   let dicMap = {}
   for (let word of strs) {
      const k = new Array(26).fill(0);
      for (let ch of word) {
         k[ch.charCodeAt() - 'a'.charCodeAt()] += 1
      }
      if (!dicMap[k]) {
         dicMap[k] = [word]
      } else {
         dicMap[k].push(word)
      }
   }
   return Object.values(dicMap)
};


// Enumeration Method
function enumeration(strs) {
   let dicMap = {}
   for (let i = 0; i < strs.length; i++) {
      const word = strs[i]
      const key = word.split('').sort().join('')
      if (!dicMap[key]) {
         dicMap[key] = [word]
      } else {
         dicMap[key].push(word)
      }
   }
   return Object.keys(dicMap).reduce((res, el) => {
      const key = []
      const currentWords = dicMap[el]
      res.push(currentWords)
      return res
   }, [])
};

export default groupAnagrams;
