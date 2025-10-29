/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let node = {
    next: null
  }
  let dummyHead = node;

  while (l1 || l2) {
    let val1 = l1 ? l1.val : Infinity;
    let val2 = l2 ? l2.val : Infinity;
    if (val1 < val2) {
      node.next = {
        val: val1,
        next: null
      }
      node = node.next;
      l1 = l1.next;
    } else {
      node.next = {
        val: val2,
        next: null
      }
      node = node.next;
      l2 = l2.next;
    }
  }

  return dummyHead.next

};

var mergeTwoListsV0 = function (l1, l2) {
  let headL1 = l1;
  let headL2 = l2;
  // 注意此处初始值必须赋值为 null 避免 leetcode 在空值时报错
  let resHead = null,
    moveHead = null;

  while (headL1 || headL2) {
    let val;
    if (headL1 && headL2) {
      if (headL1.val < headL2.val) {
        val = headL1.val;
        headL1 = headL1.next;
      } else {
        val = headL2.val;
        headL2 = headL2.next;
      }
    } else if (headL1 && !headL2) {
      val = headL1.val;
      headL1 = headL1.next;
    } else {
      val = headL2.val;
      headL2 = headL2.next;
    }
    let node = new ListNode(val);
    if (!resHead) {
      resHead = moveHead = node;
    } else {
      moveHead.next = node;
      moveHead = node;
    }
  }
  return resHead;
};

function ListNode(val) {
  this.val = val;
  this.next = null;
}

export default mergeTwoLists;
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
