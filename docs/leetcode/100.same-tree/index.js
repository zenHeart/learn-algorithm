/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  let queeP = [p];
  let queeQ = [q];
  while (queeP.length || queeQ.length) {
    let pNode = queeP.shift();
    let qNode = queeQ.shift();
    let pVal = pNode ? pNode.val : null;
    let qVal = qNode ? qNode.val : null;
    if (pVal !== qVal) {
      return false;
    } else {
      pNode && queeP.push(pNode.left, pNode.right);
      qNode && queeQ.push(qNode.left, qNode.right);
    }
  }
  return true;
};
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
export default isSameTree;
