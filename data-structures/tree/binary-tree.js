/**
 * 创建一个随机二叉树
 * 输入为二叉树的深度 n
 * {key:'',children:[]}
 * {key:'',children:[]}
 **/
// 创建一个节点
function createNode(depth, full = false) {
    let tree = {
        key: randomNum()
    };
    if (depth > 0) {
        tree.children = [createNode(depth - 1), createNode(depth - 1)];
    }
    return tree;
}

function randomNum(range = 100) {
    return ~~(Math.random() * range);
}
console.dir(createNode(0), { depth: null });
console.dir(createNode(3), { depth: null });
console.dir(createNode(2, true), { depth: null });
