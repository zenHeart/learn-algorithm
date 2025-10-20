import func from './index.js';
import { describe, it, expect } from 'vitest';
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let testData = fs.readFileSync(path.resolve(__dirname, './testdata.yaml'), 'utf8');
let tests = yaml.parse(testData).tests;
const FILE_NAME = path.basename(path.dirname(__filename));

describe(FILE_NAME, () => {
  tests.forEach((ele, index) => {
    it(`tests ${index}`, () => {
      let res = func(...ele.input);
      expect(res).toEqual(ele.expect);
    });
  });
});
