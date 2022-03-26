const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  day: String,
  reminder: Boolean
})

module.exports = mongoose.model('Task', taskSchema)