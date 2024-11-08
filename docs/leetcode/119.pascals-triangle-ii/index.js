/**
 * @param {number} rowIndex
 * @return {number[]}
 */
 var getRow = function(rowIndex) {
  if(rowIndex == 0) {
    return [1];
  }
  let prevRow = getRow(rowIndex - 1);
  let row = []
  for(let i =0; i<=rowIndex; i++) {
    let prevRowL = prevRow[i-1] || 0;
    let prevRowR = prevRow[i] || 0;
    row.push(prevRowL + prevRowR);
  }
  return row;
};
module.exports = getRow;
