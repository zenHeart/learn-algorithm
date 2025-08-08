export default function isValid(str: string): boolean {
  const stack: string[] = []
  for (let i = 0; i < str.length; i++) {
    const cur = str[i]
    if (cur === '(') {
      stack.push(cur)
    } else {
      // 先出现右括号不对
      if (stack.length === 0) {
        return false
      }
      stack.pop()
    }
  }
  return stack.length === 0
}
