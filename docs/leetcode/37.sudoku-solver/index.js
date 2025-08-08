
// 解数独主函数，输入为9x9字符矩阵
var solveSudoku = function (board) {
  // 记录每一行、每一列、每个3x3宫格中1-9数字是否已出现
  const rows = Array.from({ length: 9 }, () => Array(10).fill(false));
  const cols = Array.from({ length: 9 }, () => Array(10).fill(false));
  const boxes = Array.from({ length: 9 }, () => Array(10).fill(false));
  // 记录所有待填空格的位置
  const emptyCells = [];

  // 初始化状态：填充rows、cols、boxes，并收集空格位置
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') {
        // 记录空格
        emptyCells.push([r, c]);
      } else {
        // 标记数字已出现
        const num = +val;
        rows[r][num] = cols[c][num] = boxes[boxIndex(r, c)][num] = true;
      }
    }
  }

  // 计算单元格属于哪个3x3宫格
  function boxIndex(r, c) {
    return Math.floor(r / 3) * 3 + Math.floor(c / 3);
  }

  // 回溯函数，尝试为第idx个空格填数字
  function backtrack(idx) {
    if (idx === emptyCells.length) return true; // 所有空格已填完
    const [r, c] = emptyCells[idx];
    for (let num = 1; num <= 9; num++) {
      // 检查该数字在行、列、宫格是否可用
      if (!rows[r][num] && !cols[c][num] && !boxes[boxIndex(r, c)][num]) {
        // 放置数字
        board[r][c] = String(num);
        rows[r][num] = cols[c][num] = boxes[boxIndex(r, c)][num] = true;

        // 递归填下一个空格
        if (backtrack(idx + 1)) return true;

        // 回溯撤销选择
        board[r][c] = '.';
        rows[r][num] = cols[c][num] = boxes[boxIndex(r, c)][num] = false;
      }
    }
    // 9个数字都不行，返回false
    return false;
  }

  // 从第0个空格开始回溯
  if (backtrack(0)) {
    return board; // 返回已填好的数独
  } else {
    throw new Error("No solution exists"); // 如果无法填充，抛出错误
  }

};



// 示例输入success
const board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];

// 示例 fail
const Failboard = [
  ['5', '2', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];



// 输出解后的数独
console.log(solveSudoku(Failboard));
