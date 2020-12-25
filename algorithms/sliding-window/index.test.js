const index = require('./index');
const { expect } = require('chai');

let testData = {
  'k = 5':  [
    [[1, 3, 2, 6, -1, 4, 1, 8, 2], 5], // input
    [2.2, 2.8, 2.4, 3.6, 2.8] // output
   ],
  'k = 1':  [
    [[1, 3, 2, 6, -1, 4, 1, 8, 2], 1], // input
    [1, 3, 2, 6, -1, 4, 1, 8, 2] // output
   ],
  'k = 0':  [
    [[1, 3, 2, 6, -1, 4, 1, 8, 2], 0], // input
    undefined // output
   ],
}

describe('sliding window', function () {
  describe('index.basic', function () {
    let testKeys = Object.keys(testData);
    testKeys.forEach(key => {
      it(key, function() {
        let data = testData[key];
        let res = index.basic(...data[0])
        expect(res).to.deep.eq(data[1])
      })
    })
  })

  describe('index.sildeWindow', function () {
    let testKeys = Object.keys(testData);
    testKeys.forEach(key => {
      it(key, function() {
        let data = testData[key];
        let res = index.basic(...data[0])
        expect(res).to.deep.eq(data[1])
      })
    })
  })
});
