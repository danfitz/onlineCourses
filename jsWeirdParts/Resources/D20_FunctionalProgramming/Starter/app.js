const arr = [1, 2, 3];

function mapForEach(arr, fn) {
  const newArr = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(
      fn(arr[i])
    );
  };
  
  return newArr;
};

const checkPastLimit = function(limiter) {
  return function(item) {
    return item > limiter;
  };
};

const arr1 = mapForEach(arr, checkPastLimit(2));

console.log(arr);
console.log(arr1);