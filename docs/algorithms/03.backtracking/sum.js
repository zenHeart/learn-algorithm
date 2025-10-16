function sum(nums, target) {
   const result = [];

   function backtrack(path = [], sum = 0, start = 0) {
      if (sum === target) {
         result.push(path);
         return;
      }
      for (let i = start; i < nums.length; i++) {
         const cur = nums[i];
         if (sum + cur > target) continue;
         backtrack([...path, cur], sum + cur, i); // 如果每个数字可重复选用，传 i；如果不可重复，传 i+1
      }
   }
   backtrack();
   return result;
}

console.log(sum([1, 2, 3, 4], 4));
