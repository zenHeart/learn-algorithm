/**
 * 利用 dummy 简化链表操作
 */
let l0 = null

let l1 = {
  val: 1,
}

let l2 = {
  next: {
    val: 2,
  },
  val: 1,
}

// search not need dummy
function logLinkedlist(l) {
  while (l?.val) {
    console.log(l?.val)
    l = l.next
  }
}

// add
function addToLinkedList(l, value) {
  if (l === null) {
    return {
      val: value,
    }
  }
  let cur = l
  while (cur.next) {
    cur = cur.next
  }
  cur.next = {
    val: value,
  }
  return l
}

function addWithSentinel(l, value) {
  let dummy = {
    next: l,
  }
  let cur = dummy
  while (cur.next) {
    cur = cur.next
  }

  cur.next = {
    val: value,
  }

  return dummy.next
}

// delete
function deleteFromLinkedList(l, value) {
  if (l === null) {
    return null
  }
  if (l.val === value) {
    return l.next || null
  }
  let cur = l
  while (cur.next) {
    if (cur.next.val === value) {
      cur.next = cur?.next?.next
      return l
    }
    cur = cur.next
  }
  return l
}

function deleteWithSentinel(l, value) {
  let dummy = {
    next: l,
  }
  let cur = dummy
  while (cur.next) {
    if (cur.next.val === value) {
      cur.next = cur?.next?.next
    }
    cur = cur.next
  }

  return dummy.next
}

// console.log(addToLinkedList(l0, 1))
// console.log(addToLinkedList(l1, 2))
// console.log(addToLinkedList(l2, 3))

// console.log(deleteFromLinkedList(l0, 1))
// console.log(deleteFromLinkedList(l1, 1))
// console.log(deleteFromLinkedList(l2, 2))

// console.log(addWithSentinel(l0, 1))
// console.log(addWithSentinel(l1, 2))
// console.log(addWithSentinel(l2, 3))

console.log(deleteWithSentinel(l0, 1))
console.log(deleteWithSentinel(l1, 2))
console.log(deleteWithSentinel(l2, 3))
