/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function(A, B, C) {
  const n = A.length;

  if(n === 1) {
    const temp = A.pop()
    C.push(temp)
    return
  } else if(n === 2) {
    let temp = A.pop();
    B.push(temp);
    temp = A.pop()
    C.push(temp)
    temp = B.pop()
    C.push(temp)
    return 
  } else {
    
  }

    
};
export default hanota;
