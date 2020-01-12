const isSubsequence = require('./isSubsequence')

test('isSubsequence("hello", "hello world") should return true', () => {
  expect(isSubsequence('hello', 'hello world')).toBe(true)
})

test('isSubsequence("sing", "sting") should return true', () => {
  expect(isSubsequence('sing', 'sting')).toBe(true)
})

test('isSubsequence("abc", "abracadabra") should return true', () => {
  expect(isSubsequence('abc', 'abracadabra')).toBe(true)
})

test('isSubsequence("abc", "acb") should return true', () => {
  expect(isSubsequence('abc', 'acb')).toBe(false)
})