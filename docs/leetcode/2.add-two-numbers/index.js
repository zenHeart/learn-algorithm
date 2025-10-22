/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(0); // 哑节点，简化头节点处理
  let current = dummy;
  let carry = 0;

  while (l1 || l2 || carry) { // 注意：carry 也要作为循环条件！
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const total = val1 + val2 + carry;
    carry = Math.floor(total / 10);
    // 简化了节点创建
    current.next = new ListNode(total % 10);
    current = current.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next; // 跳过哑节点
};



var addTwoNumbersV2 = function (l1, l2) {
  let l1p = l1;
  let l2p = l2;
  let newNode = {
    next: null,
    val: 0
  }
  let prev
  const head = newNode;
  let carry = 0;

  while (l1p || l2p) {
    let num1 = l1p?.val || 0;
    let num2 = l2p?.val || 0
    let total = num1 + num2 + carry
    let sum = (total) % 10;
    carry = total >= 10 ? 1 : 0;
    newNode.val = sum;
    newNode.next = {
      next: null,
      val: 0
    }
    prev = newNode;
    newNode = newNode.next;
    l1p = l1p?.next;
    l2p = l2p?.next;
  }
  if (carry) {
    newNode.val = carry
  } else {
    prev.next = null
  }

  return head
};


function addTwoNumbersV1(l1, l2) {
  let headL1 = l1;
  let headL2 = l2;
  let carry = 0;
  let resList, moveHead;
  while (headL1 || headL2) {
    let sum = (headL1 ? headL1.val : 0) + (headL2 ? headL2.val : 0) + carry;
    let modVal = sum % 10;
    carry = sum > 9 ? 1 : 0;

    let node = new ListNode(modVal);
    if (!resList) {
      resList = moveHead = node;
    } else {
      moveHead.next = node;
      moveHead = node;
    }
    if (headL1) {
      headL1 = headL1.next;
    }
    if (headL2) {
      headL2 = headL2.next;
    }
  }
  if (carry) {
    moveHead.next = new ListNode(carry);
  }
  return resList;
}

function ListNode(val) {
  this.val = val;
  this.next = null;
}


export default addTwoNumbers;