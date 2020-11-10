'use strict';

const fix = val => () => val;

const add = (a, b) => a + b;
console.log(add(fix(1)(), fix(10)()));

const add2 = (fn1, fn2) => add(fn1(), fn2());
console.log(add2(fix(1), fix(10)));

// const addn = (...fns) => fns.reduce((acc, fn) => add2(() => acc, fn), 0);

// const addn = (...fns) => {
//   while (fns.length > 2) {
//     const [fn0, fn1, ...rest] = fns;
//     fns = [() => add2(fn0, fn1), ...rest];
//   }

//   return add2(fns[0], fns[1]);
// };

// const addnRecurse = (total, ...fns) => {
//   const fn = fns[0];
//   total = total + fn();
//   if (fns.length === 1) return total;
//   return addnRecurse(total, ...fns.slice(1));
// };
// const addn = (...fns) => addnRecurse(0, ...fns);
const addn = (...fns) => {
  if (fns.length === 0) return;
  const [fn0, fn1, ...rest] = fns;
  if (fns.length === 1) return fn0();
  if (fns.length === 2) return add2(fn0, fn1);
  return addn(() => add2(fn0, fn1), ...rest);
};

console.log(addn(fix(1)));

const nums = [1, 1, 3, 6, 8, 9];
const uniqueNums = nums.reduce((acc, num) => {
  if (!acc.includes(num)) {
    acc.push(num);
  }
  return acc;
}, []);
console.log(uniqueNums);

const uniqueEvenNums = uniqueNums.filter(num => num % 2 === 0);
console.log(uniqueEvenNums);

console.log(addn(...uniqueEvenNums.map(num => fix(num))));
