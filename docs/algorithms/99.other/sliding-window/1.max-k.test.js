const { expect } = require('chai');

function answer(arr, k ) {
  if(k <= 0 ) {
    return
  }
  let windowStart = windowEnd = windownSum = 0;
  let max = 0;
 
  for(windowEnd; windowEnd < arr.length ;windowEnd++ ) {
    windownSum+= arr[windowEnd];

    if(windowEnd >= k -1) {
      if(windownSum >= max) {
        max = windownSum
      }
      windownSum-=arr[windowStart];
      windowStart++
    }
  }
  return max
}

let testData = {
  'k = 5':  [
    [[1, 3, 2, 6, -1, 4, 1, 8, 2], 5], // input
    18 // output
   ],
  'k = 1':  [
    [[1, 3, 2, 6, -1, 4, 1, 18, 2], 1], // input
    18 // output
   ],
  'k = 0':  [
    [[1, 3, 2, 6, -1, 4, 1, 18, 2], 0], // input
    undefined // ouåßtput
   ],
}

describe('max in sub k array', function () {
  let testKeys = Object.keys(testData);
  testKeys.forEach(key => {
    it(key, function() {
      let data = testData[key];
      let res = answer(...data[0])
      expect(res).to.deep.eq(data[1])
    })
  })
})
