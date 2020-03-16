/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let currentChar = s[i];
    let beforeBracket = stack.length ? stack[stack.length - 1] : '';
    switch (s[i]) {
      case '(':
        stack.push('(');
        break;
      case '[':
        stack.push('[');
        break;
      case '{':
        stack.push('{');
        break;
      case ')':
        if (beforeBracket === '(') {
          stack.pop();
        } else {
          return false;
        }
        break;
      case ']':
        if (beforeBracket === '[') {
          stack.pop();
        } else {
          return false;
        }
        break;
      case '}':
        if (beforeBracket === '{') {
          stack.pop();
        } else {
          return false;
        }
        break;
      default:
        null;
    }
  }
  if (stack.length) {
    return false;
  } else {
    return true;
  }
};

module.exports = isValid;
