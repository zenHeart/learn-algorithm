class LRUCache {
   constructor(size = 10) {
      this.size = size;
      this.cache = new Map();
   }

   get(key) {
      if (this.cache.has(key)) {
         // 调整顺序
         const value = this.cache.get(key)
         this.cache.delete(key);
         this.cache.set(key, value);
         return value;
      }
      return undefined;
   }

   set(key, value) {
      const len = this.cache.size;
      // 可以新加入
      if (len < this.size) {
         this.cache.set(key, value);
      } else { // 如果 LRU 满了，需要淘汰最后的一个
         const { value: [k] } = this.cache.entries().next()
         this.cache.delete(k);
         this.cache.set(key, value);
      }
      return value
   }

   delete(key) {
      this.cache.delete(key);
   }
}


const cache = new LRUCache(2);
cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3);
console.log(cache.get('a')); // undefined
console.log(cache.get('b')); // 2
console.log(cache.set('d', 4)); // 淘汰 'c'
console.log(cache.get('c')); // undefined