/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
   const sr1 = (ax2 - ax1) * (ay2 - ay1)
   const sr2 = (bx2 - bx1) * (by2 - by1)
   let acrossX = Math.min(ax2, bx2) - Math.max(ax1, bx1)
   acrossX = acrossX > 0 ? acrossX : 0;
   let acrossY = Math.min(ay2, by2) - Math.max(by1, ay1)
   acrossY = acrossY > 0 ? acrossY : 0;
   const overRec = acrossX * acrossY
   return sr1 + sr2 - overRec
};

export default computeArea;
