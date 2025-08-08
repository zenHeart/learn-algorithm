
function nQueue(n) {
  const res = []

  function backtracking(path = []) {
    const currentRow = path.length
    // 1. 完成所有路径选择
    if (currentRow === n) {
      res.push(path.map(el => el.join('')).join('\n'))
      return
    }

    // 2. 开始当前行的选择
    for (let i = 0; i < n; i++) {
      // 3. 剪枝操作，如果有横/竖/斜线冲突则跳过
      const positions = path.map((el, i) => [el.findIndex(el => el === 1), i])
      if (
        // 列重叠
        positions.some(el => el[0] === i) ||
        // 斜线重叠
        positions.some(([col, row]) =>
        (currentRow - row === col - i ||
          currentRow - row === i - col))
      ) {
        continue
      }
      // 4. 做出选择
      const row = new Array(n).fill(0)
      row[i] = 1
      path.push(row)
      backtracking(path)
      // 5. 撤销选择，进行下一个分支逻辑
      path.pop()
    }
  }
  backtracking()
  return res
}


nQueue(8).forEach(el => console.log(el, '\n'))

