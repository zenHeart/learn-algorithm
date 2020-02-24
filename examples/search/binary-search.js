/**
 * 二分法查找结果
 * 1. 提取中间索引
 * 2. 和期望值比对
 * 		1. 相等返回当前索引 + 偏移
 * @param {Number} num 目标  
 * @param {Array} arr 期望数组 
 * @param {Number} offset 偏移索引 
 * 
 * 采用循环怎么写???
 */
function binarySearch(num,arr,offset=0) {
	//只有一个元素返回 -1
	if(!arr.length || (arr.length==1 && arr[0] !== num)) {
		return -1;
	}

	// 提取比较的索引
	let compareIndex = Math.floor(arr.length/2);
	let compareNum = arr[compareIndex];


	if(compareNum > num) {
		return  binarySearch(num,arr.slice(0,compareIndex));
	} else if(compareNum < num) {
		return  binarySearch(num,arr.slice(compareIndex,arr.length),compareIndex);
	} else if(compareNum === num) {
		// 重点是添加偏移值
		return compareIndex + offset;
	} else {
		return -1;
	}
}

var arr = [0,1,6,7,8,20,22,34,56,87,99,100];
console.log(binarySearch(34,arr),arr.indexOf(22));