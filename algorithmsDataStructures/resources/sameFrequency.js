// ===== FREQUENCY COUNTER PATTERN =====

// Write a function: given two positive integers, find out if the two numbers have the same frequency of digits
// Require time complexity: O(n)
// Sample input: sameFrequency(182, 281) returns true, sameFrequency(34, 14) returns false

const sameFrequency = (a, b) => {
  // Convert to string for character granularity
  a = String(a)
  b = String(b)

  if (a.length !== b.length) return false // <= short circuit

  // Frequency counter
  const frequency = {}

  // Add a to frequency counter
  for (let i = 0; i < a.length; i++) {
    const numA = a[i]
    frequency[numA] = frequency[numA] ? frequency[numA] + 1 : 1
  }

  // Remove a from frequency counter using b (and make number's count -1 if not found)
  for (let i = 0; i < b.length; i++) {
    const numB = b[i]
    frequency[numB] = frequency[numB] !== undefined ? frequency[numB] - 1 : -1
  }

  // If anything in the frequency counter is NOT 0, a and b don't have same frequency of numbers
  for (let key in frequency) {
    if (frequency[key] !== 0) return false
  }

  // Otherwise, return true! All tests passed!
  return true
}