'use strict';

function lotteryNum() {
  return (Math.round(Math.random() * 100) % 58) + 1;
}

function pickNumber(nums, newNum) {
  const newNums = [...nums];

  if (!newNums.includes(newNum)) {
    newNums.push(newNum);
    newNums.sort((a, b) => a - b);
  }

  return newNums;
}

var luckyLotteryNumbers = [];

while (luckyLotteryNumbers.length < 6) {
  luckyLotteryNumbers = pickNumber(
    Object.freeze(luckyLotteryNumbers),
    lotteryNum()
  );
}

console.log(luckyLotteryNumbers);
