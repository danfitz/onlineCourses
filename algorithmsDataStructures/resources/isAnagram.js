// ===== FREQUENCY COUNTER PATTERN =====

// This function compares is two words are anagrams of each other
// The time complexity is `O(n)`
const isAnagram = (word1, word2) => {
  if (word1.length !== word2.length) return false

  const charFrequency1 = {}
  const charFrequency2 = {}

  for (let i = 0; i < word1.length; i++) {
    const char1 = word1[i]
    const char2 = word2[i]
    charFrequency1[char1] = (charFrequency1[char1] || 0) + 1
    charFrequency2[char2] = (charFrequency2[char2] || 0) + 1
  }

  for (let char in charFrequency1) {
    if (!charFrequency1[char]) return false
    if (charFrequency1[char] !== charFrequency2[char]) return false
  }

  return true
}