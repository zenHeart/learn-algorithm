/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = [];
  const choices = ['(', ')'];
  function formatResult(path) {
    let res = '';
    const stack = [];
    for (let i = 0; i < path.length; i++) {
      let cur = path[i];
      if (cur === '(') {
        res += cur;
        stack.push(cur);
      } else {
        res += cur;
        stack.pop();
      }
    }
    while (stack.length) {
      res += ')';
      stack.pop();
    }
    return res;
  }

  function backtracking(path = []) {
    // 结果
    const leftCount = path.filter(el => el === '(').length;
    const rightCount = path.filter(el => el === ')').length;
    if (leftCount === n) {
      result.push(formatResult(path));
      return;
    }
    // 选择列表
    for (let i = 0; i < 2; i++) {
      const choice = choices[i];

      // 剪枝, 右括号不能多于左括号
      if (rightCount >= leftCount && choice === ')') {
        continue;
      }
      // 做出选择
      path.push(choice);
      backtracking(path);
      // 撤销选择
      path.pop();
    }
  }
  backtracking();
  return result;
};


var generateParenthesisV2 = function (n) {
  const result = [];

  function backtrack(path, left, right) {
    // 结束条件
    if (path.length === 2 * n) {
      result.push(path.join(''));
      return;
    }
    // 尝试放左括号
    if (left < n) {
      path.push('(');
      backtrack(path, left + 1, right);
      path.pop();
    }
    // 尝试放右括号
    if (right < left) {
      path.push(')');
      backtrack(path, left, right + 1);
      path.pop();
    }
  }

  backtrack([], 0, 0);
  return result;
};

var generateParenthesisV3 = function (n) {
  const res = [];
  const path = new Array(2 * n); // 预分配长度，避免动态扩容

  function backtrack(pos, left, right) {
    // 已填满，加入结果
    if (pos === 2 * n) {
      res.push(path.join(''));
      return;
    }
    // 放左括号
    if (left < n) {
      path[pos] = '(';
      backtrack(pos + 1, left + 1, right);
    }
    // 放右括号
    if (right < left) {
      path[pos] = ')';
      backtrack(pos + 1, left, right + 1);
    }
  }

  backtrack(0, 0, 0);
  return res;
};

var generateParenthesisV4 = function (n) {
  const result = [];
  const path = new Array(n << 1); // 位运算替代乘法
  const len = n << 1; // 缓存长度，避免重复计算

  function backtrack(pos, left, right) {
    if (pos === len) {
      result.push(path.join(''));
      return;
    }
    if (left < n) {
      path[pos] = '(';
      backtrack(pos + 1, left + 1, right);
    }
    if (right < left) {
      path[pos] = ')';
      backtrack(pos + 1, left, right + 1);
    }
  }

  backtrack(0, 0, 0);
  return result;
};



console.log(generateParenthesisV4(3));