class LinkedList {
  constructor() {
    this.head;
    this.length = 0;
  }
  add(val) {
    // @ts-ignore
    this.append(new Node(val));
  }
  append(node) {
    if (this.head) {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    } else {
      this.head = node;
    }
    this.length++;
  }
  remove(position) {
    // 非法节点直接删除
    if (position < 0 || position > this.length) {
      return false;
    } else {
      let currentNode = this.head;
      let currentCount = 0;
      while (currentCount !== position) {
        currentNode = currentNode.next;
        currentCount++;
      }
    }
  }
}
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function createListWithArray(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('input not array');
  }
  let list = new LinkedList();
  arr.forEach(ele => {
    list.add(ele);
  });
  return list.head || null;
}

exports.LinkedList = LinkedList;
exports.Node = Node;
exports.createListWithArray = createListWithArray;
