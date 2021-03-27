let apples = 5;
let speed: string = 'fast';
let hasName: boolean = true;
let nothingMuch: null = null;

let now: Date = new Date();

let colors: string[] = ['red', 'green', 'blue'];

// Function
const logNumber: (i: number) => void = (i: number) => {
  console.log(i);
};

// When to use annotations
// 1. Function that returns the `any` type
const json = '{ "x": 10, "y": 20 }';
const coordinates = JSON.parse(json);
console.log(coordinates);

// 2. Delayed initialization
let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green') {
    foundWord = true;
  }
}

// 3. Variable whose type cannot be inferred
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}
