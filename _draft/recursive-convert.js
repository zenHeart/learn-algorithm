// 将递归模式转换为队列模式
// 版本一
function fib(n) {
  if(n == 1) {
    return 1;
  } else if(n==2) {
    return 1;
  } else {
    return fib(n-1) + fib(n-2)
  }
}
// cached 版本
let _cache = {};
function fib_cache_queue(n) {
  var k1 = k2 = k3 = 1;
  for(var j = 3;j<= n;j++) {
    k3 = k1 + k2;
    k1 = k2;
    k2 = k3;
  }
  return k3;
}
console.log(fib_cache_queue(1))