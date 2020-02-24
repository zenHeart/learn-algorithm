class LinkedList {
    constructor() {
        this.head = null;
        this.length = 0;
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
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

exports.LinkedList = LinkedList;
exports.Node = Node;
