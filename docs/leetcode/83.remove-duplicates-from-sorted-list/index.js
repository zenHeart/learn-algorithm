/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let moveHead = head;
  while (moveHead) {
    let current = moveHead.val;
    let nextVal = moveHead.next ? moveHead.next.val : null;
    if (current === nextVal) {
      let next = moveHead.next ? moveHead.next.next : null;
      moveHead.next = next;
    } else {
      moveHead = moveHead.next;
    }
  }
  return head;
};
function ListNode(val) {
  this.val = val;
  this.next = null;
}
export default deleteDuplicates;
