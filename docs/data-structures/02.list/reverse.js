function reverse(head) {
   let prev = null;
   let current = head;
   while (current) {
      const temp = current.next;
      current.next = prev;
      prev = current;
      current = temp;

   }
   return prev;
}

console.dir(JSON.stringify(reverse({
   val: 1,
   next: {
      val: 2,
      next: {
         val: 3,
         next: {
            val: 4,
            next: {
               val: 5,
               next: null
            }
         }
      }
   }
})))