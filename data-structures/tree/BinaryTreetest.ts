const BinaryTree = require('./BinaryTree');
const { TREE1 }  = require('./testdata')
const { expect } = require('chai');

const SUITE_NAME = 'BinaryTree'
const TEST_DATA = {
  preOrder: [
    [TREE1, 'preOrder'],
    ['a', 'b','d', 'e', 'g', 'c', 'f', 'h', 'i']
  ],
  inOrder: [
    [TREE1, 'inOrder'],
    ['d','b','g','e','a','c','h','f','i']
  ],
  postOrder: [
    [TREE1, 'postOrder'],
    ['d','g','e','b','h','i','f','c','a']
  ],
};


describe.skip(SUITE_NAME, function() {
  for (let unitTestName in TEST_DATA) {
    it(unitTestName, function() {
      let data = TEST_DATA[unitTestName];
      let tree = new BinaryTree(data[0][0]);
      let res = tree[data[0][1]]();
      expect(res).to.deep.eq(data[1]);
    });
  }
});
