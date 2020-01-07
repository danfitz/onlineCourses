// Create a function that returns the number of unique values in a SORTED array of numbers
// [1, 2, 3] should return 3
// [1, 1, 1, 5] should return 2

const countUniqueValues = nums => {
  // Initialize count for unique values
  let count = 0

  // If empty array, return 0
  // Otherwise, add 1
  if (!nums.length) {
    return count
  } else {
    count++
  }


  // current maintains last known unique value; search finds the next one
  let current = 0
  let search = 1

  // Until we reach the end of the array...
  while (search < nums.length) {
    // If a new number has been found, add to count and move current to search
    if (nums[current] !== nums[search]) {
      count++
      current = search
    }

    // Then move search to next position
    search++
  }

  return count
}