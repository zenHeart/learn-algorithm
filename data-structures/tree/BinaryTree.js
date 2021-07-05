// https://www.icourse163.org/learn/PKU-1002534001?tid=1463702485#/learn/content?type=detail&id=1241910200&cid=1264615420
class BinaryTreeNode {
  // key
  key
  // val 保存值
  val;
  // 左节点信息
  lc;
  // 右节点信息
  rc;
  constructor(val,left,right) {
    this.val = val
    this.lc = left
    this.rc = right
  }
  // 判断是否为叶子节点
  isLeaf() {
    return !this.lc && !this.rc;  
  }
}

class BinaryTree {
  // 根节点
  root;
  // 父节点 parent
  parent
  
  constructor(root) {
    this.root = root
  }
 
  // 创建新的左右子树
  createTree(leftTree, rightTree) {
    
  }

  // 删除节点
  deleteTree() {

  }

  // 判断是否为空
  isEmpty() {
    return !this.root
  }

  // 遍历
  // 前序
  preOrder() {

  }

  // 中序
  inOrder() {

  }

  // 后序
  postOrder() {

  }

  // 层遍历
  levelOrder() {

  }
}

module.exports = BinaryTree;