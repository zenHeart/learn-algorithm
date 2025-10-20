/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
let MIN = Number.MIN_VALUE;
var merge = function (nums1, m, nums2, n) {
  let i = 0;
  let j = 0;
  while (i < m || j < n) {
    let currentN1 = i < m ? nums1[i] : MIN;
    let currentN2 = j < n ? nums2[j] : MIN;
    if (currentN1 > currentN2) {
      let temp = currentN1;
      nums1[i] = currentN2;
      nums2[j] = temp;
      i++;
    } else {
    }
  }
};
export default merge;
