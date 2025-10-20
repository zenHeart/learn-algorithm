// 为了避免重复计算采用缓存
var numIslands = function (grid) {
  let lands = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      // 记录当前坐标信息
      let point = [i, j];
      // 如果改点是陆地才做处理
      if (grid[i][j] === '1') {
        // 获取该点的相邻岛屿
        let neighboursLands = checkNeighbour(point, lands);
        // 合并这些岛屿返回新岛屿
        lands = combineLands(lands, point, neighboursLands)
      }
    }
  }
  return lands.length;
};

function combineLands(lands, point, neighboursLands) {
  // 有相邻则合并岛屿
  let newLands = [];
  let concatLands = [point];
  if (neighboursLands.length) {
    for (let i = 0; i < lands.length; i++) {
      if (!neighboursLands.includes(i)) {
        newLands.push(lands[i])
      } else {
        concatLands = concatLands.concat(lands[i])
      }
    }
    newLands.push(concatLands);
    return newLands;
  } else {
    // 没有相邻岛屿则该坐标作为单独岛屿
    lands.push(concatLands)
    return lands
  }
}

function checkNeighbour(point, lands) {
  let res = [];
  for (let l = 0; l < lands.length; l++) {
    for (let p = 0; p < lands[l].length; p++) {
      let landPoint = lands[l][p];
      let isNeighbour = (point[0] === landPoint[0] && point[1] === landPoint[1] + 1) ||
        (point[1] === landPoint[1] && point[0] === landPoint[0] + 1);
      // 相邻后无需继续比较
      if (isNeighbour) {
        res.push(l);
        break;
      }
    }
  }
  return res;
}

export default numIslands;
