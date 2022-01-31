const { areThereDuplicatesFreq, areThereDuplicatesPoint } = require('./areThereDuplicates')

// ===== TEST: FREQUENCY COUNTER PATTERN =====
test('areThereDuplicates(1,2,1) has a duplicate, so it should return true', () => {
  expect(areThereDuplicatesFreq(1,2,1)).toBe(true)
})

test('areThereDuplicates(1,2,3) should return false b/c there are no duplicates', () => {
  expect(areThereDuplicatesFreq(1,2,3)).toBe(false)
})

test('areThereDuplicates() should return false b/c args are empty', () => {
  expect(areThereDuplicatesFreq()).toBe(false)
})

// ===== TEST: MULTIPLE POINTER PATTERN =====
test('areThereDuplicates("a",2,"a") should return true', () => {
  expect(areThereDuplicatesPoint('a',2,'a')).toBe(true)
})

test('areThereDuplicates("a",2,3) should return false', () => {
  expect(areThereDuplicatesPoint('a',2,3)).toBe(false)
})

test('areThereDuplicates() should return false b/c args are empty', () => {
  expect(areThereDuplicatesPoint()).toBe(false)
})

test('areThereDuplicates(1, "a", "1", "2", 2) should return false', () => {
  expect(areThereDuplicatesPoint(1,'a','1','2',2)).toBe(false)
})