if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const Tasks = require('./Tasks')

const app = express()
  .use(cors())

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log('Connected to database')
})

app.listen(3000)

app.get('/tasks', async (req, res) => {
  const tasks = await Tasks.find({})
  console.log(tasks[1].text)
  res.json({ text: task.text, day: task.day, reminder: task.reminder })
})

async function createTask() {
  try {
    const task = await Tasks.create({
      text: "testTask2",
      day: "testDay2",
      reminder: true
    })
    //console.log(task)
  } catch (e) {
    console.log(e.message)
  }
}

//createTask()