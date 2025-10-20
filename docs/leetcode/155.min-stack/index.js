/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this._stack = [];
  this._min = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this._stack.push(x);
  // 重新保存最小值
  if (!this._min.length) {
    this._min.push(x);
  } else {
    let currentMin = this.getMin();
    this._min.push(currentMin > x ? x : currentMin);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  this._stack.pop();
  this._min.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this._stack.slice(-1)[0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return this._min.slice(-1)[0];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
export default MinStack;
