exports.insertionSort = insertionSort;
exports.bigIntAdd = bigIntAdd;

function insertionSort(arr = [], ascending = true) {
  const sortArr = [...arr];
  // start insert sort
  for (let i = 1; i < sortArr?.length; i++) {
    let val = sortArr[i];
    let j = i - 1;
    // insert val i, to 0,j range, 升序排列
    if (ascending) {
      while (j >= 0 && sortArr[j] > val) {
        sortArr[j + 1] = sortArr[j];
        j -= 1;
      }
      sortArr[j + 1] = val;
    } else {
      while (j >= 0 && sortArr[j] < val) {
        sortArr[j + 1] = sortArr[j];
        j -= 1;
      }
      sortArr[j + 1] = val;
    }
  }
  return sortArr;
}

function bigIntAdd(arr1=[], arr2=[]) {
  const res = [];
  let flag = 0;
  let i;
  for (i = 0; (i < arr1.length || i < arr2.length); i++) {
    let lowerRes = (arr1[i] ?? 0) + (arr2[i] ?? 0) + flag;
    if (lowerRes < 10) {
      res[i] = lowerRes;
      flag = 0;
    } else {
      res[i] = lowerRes % 10;
      flag = 1;
    }
  }
  if (flag == 1) {
    res[i] = flag;
  }
  return res;
}
