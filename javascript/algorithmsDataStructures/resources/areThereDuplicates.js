// Create a function that accepts a variable number of arguments and checks whether there are any duplicates among the arguments passed in
// Time complexity must be O(n); space complexity must be O(n)
// BONUS: Create a version with time complexity of O(n log n) and space complexity of O(1)

// ===== FREQUENCY COUNTER PATTERN =====
// Time complexity = O(n) via for loop
// Space complexity = O(n) via frequency object
const areThereDuplicatesFreq = (...args) => {
  if (args.length === 0) return false // short circuit

  const frequency = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    frequency[arg] = frequency[arg] ? frequency[arg] + 1 : 1
  }

  for (let key in frequency) {
    if (frequency[key] > 1) return true
  }

  return false
}

// ==== MULTIPLE POINTERS PATTERN =====
const areThereDuplicatesPoint = (...args) => {
   if (args.length === 0) return false // short circuit

   // Sort args first b/c you NEED it sorted for multiple pointers to work
   const nums = [] // Adds all args that are numbers
   const chars = [] // And strings
   args.forEach(arg => {
     if (typeof arg === 'number') nums.push(arg)
     else chars.push(arg)
   })
   args = nums.sort().concat(chars.sort()) // Sorts them separately THEN concats
   // Results are: numbers first, string representations of numbers second, actual words/characters last

   // Comparand and search are the pointers for comparing values of SORTED array
   // You move both comparand and search right 1 if no duplicate found
   let comparand = 0
   for (let search = 1; search < args.length; search++) {
     if (args[comparand] === args[search]) return true
     else comparand++
   }

   return false
}

module.exports = {
  areThereDuplicatesFreq,
  areThereDuplicatesPoint
}