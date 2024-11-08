class DoublyNode {
  constructor(
    public key: unknown,
    public prev?: DoublyNode,
    public next?: DoublyNode,
  ) {
    this.key = key;
    this.prev = prev;
    this.next = next;
  }
}

export default class DoublyLinkedList {
  public head: DoublyNode;
  constructor(key?: unknown) {
    this.head = new DoublyNode(key);
  }

  public search(k: unknown) {
    let cur: DoublyNode | undefined = this.head;

    // 指针非空且键值不匹配时，继续向后搜索
    while (cur !== undefined && cur.key !== k) {
      cur = cur.next;
    }
    return cur;
  }
}
