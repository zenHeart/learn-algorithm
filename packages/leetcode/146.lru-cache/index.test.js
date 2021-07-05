const LRUCache = require('./index');
const { expect } = require('chai');

describe('lru test', function () {
  it('basic test', function () {
    let cache = new LRUCache(2);

    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).to.eq(1);
    cache.put(3, 3); // 该操作会使得关键字 2 作废
    expect(cache.get(3)).to.eq(3);
    expect(cache.get(2)).to.eq(-1);
    cache.put(4, 4); // 该操作会使得关键字 1 作废
    expect(cache.get(1)).to.eq(-1);
    expect(cache.get(3)).to.eq(3);
    expect(cache.get(4)).to.eq(4);
  });
  it('empty test', function () {
    let cache = new LRUCache(2)
    let testData = {
      input: [
        ["get","put","get","put","put","get","get"],
        [[2],[2,6],[1],[1,5],[1,2],[1],[2]]
      ],
      expect: [-1,null,-1,null,null,2,6],
    }
    testData.input[0].forEach((operation, index) => {
      let res = cache[operation].apply(cache, testData.input[1][index])
      console.log('---', operation, testData.input[1][index])
      expect(res).to.eq(testData.expect[index])
    })
  });
});
