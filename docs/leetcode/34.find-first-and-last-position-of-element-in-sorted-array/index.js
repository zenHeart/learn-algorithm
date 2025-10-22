/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
   // 如果数组为空，直接返回 [-1, -1]
   if (nums.length === 0) {
      return [-1, -1];
   }

   // 查找第一个位置（左边界）
   const findFirst = (nums, target) => {
      let left = 0;
      let right = nums.length - 1;
      let first = -1;

      while (left <= right) {
         const mid = Math.floor((left + right) / 2);

         if (nums[mid] === target) {
            first = mid; // 记录找到的位置
            right = mid - 1; // 继续在左半部分查找
         } else if (nums[mid] < target) {
            left = mid + 1;
         } else {
            right = mid - 1;
         }
      }

      return first;
   };

   // 查找最后一个位置（右边界）
   const findLast = (nums, target) => {
      let left = 0;
      let right = nums.length - 1;
      let last = -1;

      while (left <= right) {
         const mid = Math.floor((left + right) / 2);

         if (nums[mid] === target) {
            last = mid; // 记录找到的位置
            left = mid + 1; // 继续在右半部分查找
         } else if (nums[mid] < target) {
            left = mid + 1;
         } else {
            right = mid - 1;
         }
      }

      return last;
   };

   const first = findFirst(nums, target);
   const last = findLast(nums, target);

   return [first, last];
};

export default searchRange;
