const testData = {
  m: {
    users: [2, 1],
    orders: [[2, 1], [1, 2]],
  },
  w: {
    users: [1, 2],
    orders: [[2, 1], [1, 2]],
  },
  dateTables: [],
};

function gs() {
  const leftMans = [...testData.m.users];
  while (leftMans.length) {
    let currentMan = leftMans[0];
    let dateOrder = testData.m.orders[currentMan - 1];
    for (let i = 0; i < dateOrder.length; i++) {
      let w = dateOrder[i];
      let wInDate = testData.dateTables.find((el) => el[1] === w);
      if (wInDate) {
        let wOrder = testData.w.orders[w - 1];
        let wCurrentDateMan = wInDate[0];
        let currentManIndexInWOrder = wOrder.findIndex((el) =>
          el === currentMan
        );
        let wIndateManIndexInWOrder = wOrder.findIndex((el) =>
          el === wCurrentDateMan
        );
        if (currentManIndexInWOrder < wIndateManIndexInWOrder) {
          leftMans.push(wCurrentDateMan);
          wInDate[0] = currentMan;
          leftMans.shift();
          break;
        }
      } else {
        testData.dateTables.push([currentMan, w]);
        leftMans.shift();
        break;
      }
    }
  }
  return testData.dateTables;
}

console.log(gs());
