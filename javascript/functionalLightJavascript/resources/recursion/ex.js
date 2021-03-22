'use strict';

function isPalindrome(str) {
  const isSameChar = str[0] === str[str.length - 1];
  if (str.length <= 3 || !isSameChar) return isSameChar;
  return isSameChar && isPalindrome(str.slice(1, str.length - 1));
}

console.log(isPalindrome('') === true);
console.log(isPalindrome('a') === true);
console.log(isPalindrome('aa') === true);
console.log(isPalindrome('aba') === true);
console.log(isPalindrome('abba') === true);
console.log(isPalindrome('abccba') === true);

console.log(isPalindrome('ab') === false);
console.log(isPalindrome('abc') === false);
console.log(isPalindrome('abca') === false);
console.log(isPalindrome('abcdba') === false);
