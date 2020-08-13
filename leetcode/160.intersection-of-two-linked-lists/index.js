/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  let moveHeadA = headA;
  let moveHeadB = headB;
  let intersectHead = null;
  while (moveHeadA || moveHeadB) {
    let currentA = moveHeadA ? moveHeadA.val : null;
    let currentB = moveHeadB ? moveHeadB.val : null;
    // 有一方提前结束则必然结果为 null
    if ((currentA === null && currentB) || (currentB === null && currentA)) {
      return null;
    }

    // 值相等且交叉点为空则设定初始交叉点
    if (moveHeadA === moveHeadB && !intersectHead) {
      intersectHead = moveHeadA;
    }

    moveHeadA = moveHeadA.next;
    moveHeadB = moveHeadB.next;
  }
  // 如果在节点为空,或者为头节点均不是相交

  return intersectHead;
};
module.exports = getIntersectionNode;

console.log(
  getIntersectionNode(
    {
      val: 1,
      next: {
        val: 2,
        next: null
      }
    },
    {
      val: 1,
      next: {
        val: 2,
        next: null
      }
    }
  )
);
