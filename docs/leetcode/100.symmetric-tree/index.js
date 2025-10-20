/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function isSymmetric(root) {
  let leftNode = root.left,
    rightNode = root.right;
  if (leftNode === rightNode) {
    return true;
  }
  if (leftNode && rightNode) {
    let isEqual = leftNode.val === rightNode;
    return isSymmetric(root.left) && isSymmetric(root.right);
  } else {
    return false;
  }
};
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
export default isSymmetric;
