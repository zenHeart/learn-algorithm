/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) {
    return [];
  }
  let res = [];
  const PhoneMap = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  }
  // 用于记录当前数字是否被使用
  const used = new Array(digits.length).fill(false);
  // 1， 难点 1 回溯的状态判断存在 2 个值 路径和起始位置
  function backtracking(path, start = 0) {
    // 1. 返回长度匹配的字符串, 注意这里的 path 是对应的字母
    if (path.length === digits.length) {
      res.push(path);
      return;
    }
    // 2. 选择列表, 循环数字
    for (let i = start; i < digits.length; i++) {
      // 1， 难点 2 剪枝的情况存在 2 种
      // 3. 剪枝：如果当前数字已经被使用，跳过
      if (used[i]) {
        continue;
      }
      // 3. 剪枝：如果当前数字和前一个数字相同且前一个数字未被使用，跳过
      if (i > 0 && digits[i] === digits[i - 1] && !used[i - 1]) {
        continue;
      }

      // 难点 3. 回溯作出选择的逻辑存在循环
      // 4. 做出选择
      used[i] = true;
      const letters = PhoneMap[digits[i]];
      for (let j = 0; j < letters.length; j++) {
        // 递归调用，拼接当前字母
        backtracking(path + letters[j], i + 1);
      }
      // 5. 撤销选择，进行下一个分支逻辑
      used[i] = false;
    }
  }
  // 6. 启动回溯
  backtracking('');
  return res;
};

console.log(letterCombinations('32')); // 输出所有可能的字母组合