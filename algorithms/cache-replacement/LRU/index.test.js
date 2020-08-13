const LRU = require('./index');
const { expect } = require('chai');

describe('lru test', function () {
  it('add when cache no fill', function () {
    let lru = new LRU(4);
    lru.add(1, 2);
    expect(lru.cache).to.deep.eq({
      1: 2
    });
    expect(lru._index).to.deep.eq([1]);
    lru.add(2, 2);
    lru.add(3, 2);
    lru.add(4, 2);
    expect(lru.cache).to.deep.eq({
      1: 2,
      2: 2,
      3: 2,
      4: 2
    });
    expect(lru._index).to.deep.eq([4, 3, 2, 1]);
  });
  it('add when cache  fill,replace old key', function () {
    let lru = new LRU(2);
    lru.add(1, 2);
    lru.add(2, 2);
    expect(lru.cache).to.deep.eq({
      1: 2,
      2: 2
    });

    lru.add(3, 2);
    expect(lru.cache).to.deep.eq({
        2: 2,
        3: 2
      });
    expect(lru._index).to.deep.eq([ 3, 2]);
  });
  it('get update index', function () {
    let lru = new LRU(2);
    lru.add(1, 2);
    lru.add(2, 2);
    expect(lru._index).to.deep.eq([ 2, 1]);
    lru.get(2)
    expect(lru._index).to.deep.eq([ 2, 1]);
    lru.get(1)
    expect(lru._index).to.deep.eq([ 1, 2]);
  });
  it('get data', function () {
    let lru = new LRU(3);
    lru.add(1, 1);
    lru.add(2, 2);
    lru.add(3, 3);
    expect(lru.get(1)).to.eq(1);
    expect(lru.get(3)).to.eq(3);
    expect(lru.get(2)).to.eq(2);
    expect(lru.get(4)).to.eq(-1);
    expect(lru._index).to.deep.eq([ 2,3,1]);
    lru.add(4, 4);
    expect(lru.get(1)).to.eq(-1);
  });
});
