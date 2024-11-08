/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
  let res = [];
  for(let i =0; i < nums.length; i++) {
    let ele = nums[i];
    let beforeEle = (i - 1>=0)?nums[i-1]:-Infinity;
    let afterEle = (i+1<nums.length -1)?nums[i+1]:-Infinity; 
    if(ele > beforeEle && ele > afterEle) {
      res.push(i)
    }
  }
  return res
};


module.exports = findPeakElement