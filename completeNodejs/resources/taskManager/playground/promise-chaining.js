require('../src/db/mongoose')
const User = require('../src/models/user')

// 5e9a4720078b2f09ff5effc6

// User.findByIdAndUpdate('5e9a4720078b2f09ff5effc6', { age: 3 })
//   .then(user => {
//     console.log(user)
//     return User.countDocuments({ age: user.age })
//   })
//   .then(count => console.log(count))
//   .catch(error => console.log(error))

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}

updateAgeAndCount('5e9a4720078b2f09ff5effc6', 0)
  .then(console.log)
  .catch(console.log)