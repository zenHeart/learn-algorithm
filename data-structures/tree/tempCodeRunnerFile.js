/**
 * 创建一个随机二叉树
 * 输入为二叉树的深度 n
 * {key:'',children:[]}
 * {key:'',children:[]}
 **/
// 创建一个节点
function createNode(depth) {
	let tree={
		key:null,
		children:[null,null]
	};
	if(depth === 0) {
		  tree.key = randomNum();
	} else {
		let isFull = randomNum()%3;
		if(isFull=== 0) { // 左节点
			tree.children = [createNode(depth-1),null];
		} else if(isFull === 1) {
			tree.children = [null,createNode(depth-1)];
		} else {
			tree.children = [ncreateNode(depth-1)ull,createNode(depth-1)];
		}
	}
	return tree;
}

function randomNum(range=100) {
	return ~~(Math.random()*range);
}
console.log(createNode(10));