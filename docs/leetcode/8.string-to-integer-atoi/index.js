const transferMap = {
  initial(char) {
    if (char === '-' || char === '+') {
      return 'sign'
    } else if (/[0-9]/.test(char)) {
      return 'count'
    } else if (char === ' ') {
      return 'initial'
    } else {
      return 'end'
    }
  },
  sign(char) {
    if (/[0-9]/.test(char)) {
      return 'count'
    } else {
      return 'end'
    }
  },
  count(char) {
    if (/[0-9]/.test(char)) {
      return 'count'
    } else {
      return 'end'
    }

  },
  end() {
    return 'end'
  }
}

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  let sign = 1;
  let currentState = 'initial'
  let value = 0;

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    currentState = transferMap[currentState](char);
    if (currentState === 'end') {
      break;
    }
    if (currentState === 'count') {
      if (sign === 1) {
        value = (value ?? 0) * 10 + Number(char);
        if (value >= 2147483647) return 2147483647
      } else {
        value = (value ?? 0) * 10 - Number(char);
        if (value <= -2147483648) return -2147483648
      }
    }
    if (currentState === 'sign') {
      sign = char === '-' ? -1 : 1;
    }
  }
  return value;
};

export default myAtoi