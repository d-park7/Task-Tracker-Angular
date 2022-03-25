const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  text: String,
  day: String,
  reminder: Boolean
})

module.exports = mongoose.model('Task', taskSchema)