/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (root === null) {
    return 0;
  }
  let leftNode = root.left;
  let rightNode = root.right;

  if (leftNode === rightNode) {
    // 都为 null
    return 1;
  } else if (leftNode && rightNode) {
    let leftDepth = maxDepth(leftNode);
    let rightDepth = maxDepth(rightNode);
    return leftDepth > rightDepth ? leftDepth + 1 : rightDepth + 1;
  } else {
    return leftNode ? maxDepth(leftNode) + 1 : maxDepth(rightNode) + 1;
  }
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
module.exports = maxDepth;
