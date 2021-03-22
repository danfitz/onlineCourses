// Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

// Time complexity must be O(n): it is b/c at most every item in the array is looped over ONCE (with all else constant)
// Space complexity must be O(1): it is b/c there's only 3 variables used
const averagePair = (nums, avg) => {
  if (nums.length === 0) return false // short circuit

  // Start at both ends of the array
  let left = 0 // memory
  let right = nums.length - 1 // memory

  // Continually update left and right, attempting to get closer and closer to the average
  // Any time you're too low, increase the next average by moving `left` up one
  // When you're too low, decrease by moving `right` down one
  // If left and right meet, you've run out of possibilities
  while (left < right) {
    const tempAvg = (nums[left] + nums[right]) / 2 // memory
    
    if (tempAvg === avg) return true
    else if (tempAvg < avg) left++
    else right--
  }

  return false
}

module.exports = averagePair