/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  let res = [];
  for (let i = 0; i < numRows; i++) {
    let row = [];
    let prevRow = i == 0 ? null : res[i - 1];
    for (let j = 0; j <= i; j++) {
      if (prevRow == null) {
        row = [1];
        break;
      } else {
        let preLeft = prevRow[j - 1] || 0;
        let preRight = prevRow[j] || 0;
        row[j] = preLeft + preRight;
      }
    }
    res.push(row);
  }
  return res;
};
export default generate;
