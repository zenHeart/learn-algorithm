export default function parenthensesMatch(str: string): string {
  let res: string = ''
  const stack: string[] = []

  for (let i = 0; i < str.length; i++) {
    const cur = str[i]
    if (cur === '(') {
      res += cur
      stack.push(cur)
    } else {
      // 先出现右括号不对
      if (stack.length === 0) {
        return '不匹配'
      }
      res += cur
      stack.pop()
    }
  }
  while (stack.length) {
    stack.pop()
    res += ')'
  }
  return res
}
