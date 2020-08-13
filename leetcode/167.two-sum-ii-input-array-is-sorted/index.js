/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
  let cache = {};
  for (let i = 0; i < numbers.length; i++) {
    let current = numbers[i];
    let res = target - current;
    if (!(current in cache)) {
      cache[current] = i;
    }
    if (current in cache && res in cache && cache[res] !== i) {
      return [cache[res] + 1, i + 1];
    }
  }
  return [];
};

module.exports = twoSum;

console.log(twoSum([0, 0, 3, 4], 0));
