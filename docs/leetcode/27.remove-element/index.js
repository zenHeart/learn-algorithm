/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let newIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    let currentVal = nums[i];
    if (currentVal !== val) {
      nums[newIndex] = currentVal;
      newIndex++;
    }
  }
  return newIndex;
};
export default removeElement;
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
