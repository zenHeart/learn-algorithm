const { expect } = require('chai');

function answer(arr, num ) {
  for(let i = 0 ;i < arr.length;i ++) {
    let start = i;
    let windowSize = 1;
    let min = arr.length + 1;
    
    for(let j = start;j < windowSize;j++) {
      total+=arr[windowSize]
    }
    if(total< num) {
      windowSize++;
    } else {
      if(min > windowSize ) {
        min = windowSize
      }
    }
  }
  
  return min;
}

let testData = {
  'k = 5':  [
    [[2, 1, 5, 2, 3, 2], 7 ], // input
    2 // output
   ],
  'k = 1':  [
    [[2, 1, 5, 2, 8], 7], // input
    1 // output
   ],
  'k = 0':  [
    [[3, 4, 1, 1, 6], 8], // input
    3 // ouåßtput
   ],
}

describe.skip('small in sub k array', function () {
  let testKeys = Object.keys(testData);
  testKeys.forEach(key => {
    it(key, function() {
      let data = testData[key];
      let res = answer(...data[0])
      expect(res).to.deep.eq(data[1])
    })
  })
})
