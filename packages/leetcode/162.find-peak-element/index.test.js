const func = require('./index');
const { expect } = require('chai');
const yaml = require('yaml')
const fs = require('fs')
const path = require('path')

let testData = fs.readFileSync(path.resolve(__dirname,'./testdata.yaml'),'utf8')
let tests = yaml.parse(testData).tests;
const FILE_NAME = path.basename(path.dirname(__filename));

describe(FILE_NAME, function() {
  tests.forEach((ele, index) => {
    it(`tests ${index}`, function() {
      let res = func.apply(this, ele.input)

      expect(res).deep.eq(ele.expect)
    })
  });
});
