/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
   if(prices.length <= 1) {
     return 0
   }
   else if(prices.length == 2) {
     let profit = prices[1] - prices[0];
     return profit > 0 ? profit : 0;
   } else {
     let beforePrices = prices.slice(0, -1);
     let lastPrice = prices.slice(-1)[0];
     let beforeProfit = maxProfit(beforePrices);
     let curentProfit= beforeProfit;
     for(let item of beforePrices) {
        let profit = lastPrice - item;
        if(profit > curentProfit) {
          curentProfit = profit;
        }
     }
     return curentProfit;
   }
};

module.exports = maxProfit;
