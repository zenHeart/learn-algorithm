const { expect } = require('chai');
const List = require('./LinkedList');
const { LinkedList, Node } = List;

describe('LinkedList', function() {
  let list = null;
  beforeEach(() => {
    list = new LinkedList();
  });
  describe('append', function() {
    it('insert empty', function() {
      list.append(new Node(1));
      expect(list.length).to.eq(1);
      expect(list).to.nested.include({ 'head.val': 1 });
    });
    it('insert has node', function() {
      list.append(new Node(1));
      list.append(new Node(2));
      expect(list.length).to.eq(2);
      expect(list).to.nested.include({ 'head.next.val': 2 });
    });
  });
});

describe('createListWithArray', function() {
  let testData = {
    'empty array': {
      input: [],
      expect: null
    },
    '1 elements': {
      input: [1],
      expect: { val: 1, next: null }
    },
    'multi elements': {
      input: [1, 2, 3, 4, 5],
      expect: {
        val: 1,
        next: {
          val: 2,
          next: { val: 3, next: { val: 4, next: { val: 5, next: null } } }
        }
      }
    }
  };
  for (let unitTestName in testData) {
    it(unitTestName, function() {
      let data = testData[unitTestName];

      let res = List.createListWithArray(data.input);

      expect(res).to.deep.equal(data.expect);
    });
  }
});
