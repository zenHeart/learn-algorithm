const l = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
        },
      },
    },
  },
}

function findReverse(l, k) {
  let dummy = {
    next: l,
  }
  let lp = dummy
  let rp = dummy

  // 右指针右移到 k
  let rc = 0
  while (rc <= k) {
    if (rp === null) {
      if (rc === k) {
        return lp.next
      }
      return null
    }
    rc++
    rp = rp?.next
  }

  if (rp === null) {
    return lp.next
  }

  // 继续移动右指针到末尾，则此时左指针在倒数 k
  while (rp) {
    lp = lp.next
    rp = rp.next
  }

  return lp.next
}

console.log(findReverse(l, 1)) // 4
console.log(findReverse(l, 2)) // 4
console.log(findReverse(l, 3)) // 4
console.log(findReverse(l, 4)) // 4
console.log(findReverse(l, 5)) // 4
