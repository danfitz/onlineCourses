// Write a function which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string WITHOUT THEIR ORDER CHANGING.

// ===== MULTIPLE POINTERS PATTERN =====
// Time complexity required: O(n + m)
// Space complexity required: O(1)
const isSubsequence = (str1, str2) => {
  if (str1.length > str2.length) return false // short circuit

  // Pointer for first string
  let pointer1 = 0

  // Loop through second string with its own pointer
  for (let pointer2 = 0; pointer2 < str2.length; pointer2++) {
    // Get current characters of pointers
    const char1 = str1[pointer1]
    const char2 = str2[pointer2]

    // If those characters match, increment pointer1
    // (We know that every character BEFORE pointer1 has already matched)
    if (char1 !== char2) continue
    else pointer1++
  }
  
  // If pointer1 reaches the end of the string, that means ALL characters matched
  // In this case, pointer1 should equal str1.length, which returns true
  // If it doesn't, then not all characters matched, so it returns false
  return pointer1 === str1.length
}

module.exports = isSubsequence