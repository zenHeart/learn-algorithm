/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = {};
  this.size = capacity;
  this._index = [];
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.cache[key]) {
    return -1;
  } else {
    let index = this._index.indexOf(key);
    this._index.splice(index, 1);
    this._index.unshift(key);
    return this.cache[key];
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if(!this.cache[key]) {  // key 不存在
    if (this._index.length < this.size) {
      this._index.unshift(key);
      this.cache[key] = value;
    } else {
      let removeKey = this._index.pop();
      delete this.cache[removeKey];
      this._index.unshift(key);
      this.cache[key] = value;
    }
  } else {
    this.cache[key] = value;
    // 更新 key 到最前
    let index = this._index.indexOf(key);
    this._index.splice(index, 1);
    this._index.unshift(key);
  }
  return null;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

module.exports = LRUCache;
