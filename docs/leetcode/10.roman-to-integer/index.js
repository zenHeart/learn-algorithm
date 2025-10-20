let romanToInt = function a(s) {
  let res = [];
  for (let i = 0; i < s.length; i++) {
    let current = s[i];
    // 在 js 合法,即使溢出会返回空
    let next = s[i + 1];
    if (next && ROMA_BASE[current + next]) {
      res.push(current + next);
      i++;
    } else {
      res.push(current);
    }
  }
  return res.reduce((sum, ele) => (sum += ROMA_BASE[ele]), 0);
};

export default romanToInt;
