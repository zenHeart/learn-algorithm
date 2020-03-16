const didYouMean = require('didYouMean');

didYouMean.threshold = 10;
const input = 'c';
const list = ['create', 'list'];

const res = didYouMean(input, list);
