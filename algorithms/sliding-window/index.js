
// O(n) = kn
exports.basic = (arr, k) => {
  let len = arr.length - k;
  let res = [];
  if(len<0 || k <= 0) return; // 无法计算
  for(let i = 0; i<= len; i++) {
    let sum =0;
    // 相对当前位置后 k 个元素
    for(let j = i; j<k+ i;j++) {
      sum+=arr[j]
    }
    let avg = sum/ k;
    res.push(avg)
  }
  return res;
}


exports.sildeWindow = function (arr, k) {
  let res = [];
  let windowSum = 0;
  let windowStart = 0;
  let windowEnd = 0;

  for(let windowEnd = 0;windowEnd < arr.length; windowEnd++) {
    windowSum+=windowEnd;
    if(windowEnd >= k -1) {
      res[windowStart] = windowSum / k;
      windowSum-= arr[windowStart];
      windowStart++
    }
  }
  return res
}