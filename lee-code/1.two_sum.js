
exports.twoSum = twoSum;

exports.calcAllResult = calcAllResult;



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    let res = calcAllResult(nums);
    return res[target];
};

/**
 * 计算数组不同数据和的结果
 * @param {Array} nums
 */
function calcAllResult(nums) {
   let res = {};
   let len = nums.length;
   nums.forEach((ele,index,arr) => {
        for(let i = index + 1;i<len;i++) {
            let sum = ele + arr[i];
            if(ele !== arr[i]) {
                    //此处考虑只存在一个解,若有多个解需要保存为二维数组
                    res[sum] = [index,i];
            }
        }
   })
    return res;
}