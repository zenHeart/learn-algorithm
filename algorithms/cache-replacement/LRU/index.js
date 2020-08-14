class LRU {
  constructor(size) {
    this.cache = {};
    this.size = size;
    this._index = [];
  }
  add(key, val) {
    if(!this.cache[key]) {  // key 不存在
        if (this._index.length < this.size) {
          this._index.unshift(key);
          this.cache[key] = val;
        } else {
          let removeKey = this._index.pop();
          delete this.cache[removeKey];
          this._index.unshift(key);
          this.cache[key] = val;
        }
      } else {
        this.cache[key] = val;
        // 更新 key 到最前
        let index = this._index.indexOf(key);
        this._index.splice(index, 1);
        this._index.unshift(key);
      }
  }
  get(key) {
    if (!this.cache[key]) {
      return -1;
    } else {
      let index = this._index.indexOf(key);
      this._index.splice(index, 1);
      this._index.unshift(key);
      return this.cache[key];
    }
  }
}
module.exports = LRU;
