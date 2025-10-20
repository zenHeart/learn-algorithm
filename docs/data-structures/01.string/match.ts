export function matchV0(str: string, pattern: string): number | null {
  if (pattern.length === 0) return 0
  let strIndex = null
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      const origin = str[i + j]
      const target = pattern[j]
      if (origin !== target) {
        break
      }
      if (j === pattern.length - 1) {
        strIndex = i
        return strIndex
      }
    }
  }
  return strIndex
}

// 简化为 1 层循环
export function matchV1(str: string, pattern: string): number | null {
  if (pattern.length === 0) return 0
  let strIndex = null,
    i = 0,
    j = 0,
    strLength = str.length,
    patternLength = pattern.length

  // 通过与逻辑把二层循环分解为一层
  while (i < strLength && j < patternLength) {
    const origin = str[i]
    const target = pattern[j]
    if (origin === target) {
      i++
      j++
    } else {
      // 注意这里 id 的回退位置
      i = i - j + 1
      j = 0
    }
  }

  // 终止条件的判断逻辑
  return j === patternLength ? i - j : null
}

// 简化为 1 层循环
export default function match(str: string, pattern: string): number | null {
  if (pattern.length === 0) return 0

  // 构建 next 数组
  const next: number[] = Array(pattern.length).fill(0)
  let j = 0
  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) {
      j = next[j - 1]
    }
    if (pattern[i] === pattern[j]) {
      j++
    }
    next[i] = j
  }

  // KMP 主循环
  j = 0
  for (let i = 0; i < str.length; i++) {
    while (j > 0 && str[i] !== pattern[j]) {
      j = next[j - 1]
    }
    if (str[i] === pattern[j]) {
      j++
    }
    if (j === pattern.length) {
      return i - pattern.length + 1
    }
  }
  return null
}
