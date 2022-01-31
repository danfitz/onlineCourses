require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e9a410c19920208971e74fa')
//   .then(task => {
//     return Task.countDocuments({ completed: false })
//   })
//   .then(console.log)
//   .catch(console.log)

const deleteTaskAndCount = async (id, completed) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed })
  return count
}

deleteTaskAndCount('5e9a41553dfcd208b1e78e50', false)
  .then(console.log)
  .catch(console.log)