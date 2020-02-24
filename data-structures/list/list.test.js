const { expect } = require('chai');
const { LinkedList, Node } = require('./LinkedList');

describe('LinkedList', function() {
    let list = null;
    beforeEach(() => {
        list = new LinkedList();
    });
    describe('append', function() {
        it('insert empty', function() {
            list.append(new Node(1));
            expect(list.length).to.eq(1);
            expect(list).to.nested.include({ 'head.data': 1 });
        });
        it('insert has node', function() {
            list.append(new Node(1));
            list.append(new Node(2));
            expect(list.length).to.eq(2);
            expect(list).to.nested.include({ 'head.next.data': 2 });
        });
    });
});
