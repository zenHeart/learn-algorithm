/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let mergeArr = [];
  let i = 0,
    j = 0;
  while (i < nums1.length || j < nums2.length) {
    // 均有值
    if (i < nums1.length && j < nums2.length) {
      if (nums1[i] <= nums2[j]) {
        mergeArr.push(nums1[i]);
        i++;
      } else {
        mergeArr.push(nums2[j]);
        j++;
      }
    } else if (i >= nums1.length && j < nums2.length) {
      mergeArr.push(nums2[j]);
      j++;
    } else {
      mergeArr.push(nums1[i]);
      i++;
    }
  }
  let index = mergeArr.length / 2;
  if (Number.isInteger(index)) {
    // 偶数
    return (mergeArr[index - 1] + mergeArr[index]) / 2;
  } else {
    return mergeArr[Math.floor(index)];
  }
};

export default findMedianSortedArrays;
