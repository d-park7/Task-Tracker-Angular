const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const Tasks = require('./Tasks')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.DATABASE_URL)
  .then((conn) => {
    console.log(`Connected to database: ${conn.connections[0].name}`)
  })
  .catch((err) => {
    console.error(err.message)
  })

const app = express()
  .use(cors())

app.listen(3000)

app.get('/tasks', async (req, res) => {
  const tasks = await Tasks.find({})
  res.json(tasks)
})

app.get('/tasks/:id', async (req, res) => {
  console.log(req.params.id)
  const task = await Tasks.findById(req.params.id)
  console.log(task)
  res.json(task)
})

app.post('/tasks/add', async (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

app.delete('/tasks-delete/:id', async (req, res) => {
  //console.log(req.params.id)
  const task = await Tasks.findById(req.params.id)
  //console.log(task)
  try {
    await Tasks.deleteOne({ _id: req.params.id }).then((msg) => {
      console.log(msg)
    })
  } catch (err) {
    console.error(err)
  }
  res.json(task)
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