const func = require("./index");
const { expect } = require("chai");

describe.skip("reverse integer", function () {
  let testData = [
    ["I", 1],
    ["IX", 9],
    ["XCIX", 99],
  ];
  it("test", function () {
    for (let data of testData) {
      let res = func(data[0]);

      expect(res).to.eq(data[1]);
    }
  });
});
