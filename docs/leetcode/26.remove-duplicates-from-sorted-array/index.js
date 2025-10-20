/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let newIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    let val = nums[i];
    // 遍历当前空间是否有重复值
    let j;
    for (j = 0; j < newIndex; j++) {
      if (nums[j] === val) {
        break;
      }
    }
    // 无重复则保存
    if (j >= newIndex) {
      // 没有则保存当前值
      nums[newIndex] = val;
      // 新索引加 1
      newIndex++;
    }
  }
  return newIndex;
};
export default removeDuplicates;
/* 
const {
  createListWithArray
} = require('../../data-structures/list/LinkedList');
let l1 = createListWithArray([1, 2, 4]);
let l2 = createListWithArray([1, 3, 4]);
let expectRes = createListWithArray([1, 1, 2, 3, 4, 4]);

console.dir(mergeTwoLists(l1, l2), { depth: 10 });
console.dir(expectRes, { depth: 10 });
 */
