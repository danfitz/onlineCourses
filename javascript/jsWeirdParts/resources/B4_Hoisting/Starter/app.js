// var a = 'Hello World!';

// function b() {
    
// }

// console.log(y);

let y = "HI";


function findHighestOccurrence(arr) {
  const occurrenceMap = {};

  // let maxElem;
  // let maxCount = 0;


  arr.forEach(elem => {
    occurrenceMap[elem] ? occurrenceMap[elem]++ : occurrenceMap[elem] = 1;

    // if (occurrenceMap[elem] > maxCount) {
    //   maxElem = elem;
    //   maxCount = occurrenceMap[elem];
    // };
  });

  const maxElem = Object.keys(occurrenceMap).reduce((highestNum, newNum) => occurrenceMap[highestNum] > occurrenceMap[newNum] ? highestNum : newNum);

  return maxElem;
};

console.log(findHighestOccurrence([1, 2, 3, 4, 4, 1, 1, 4]));