module.exports = addTwoNumbers;
function addTwoNumbers(l1, l2) {
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
