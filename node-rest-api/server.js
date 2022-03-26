const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const Task = require('./models/Task')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

app.listen(3000)

mongoose.connect(process.env.DATABASE_URL)
  .then((conn) => {
    console.log(`Connected to database: ${conn.connections[0].name}`)
  })
  .catch((err) => {
    console.error(err.message)
  })

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.json(tasks)
  } catch (err) {
    console.error(err)
  }
})

app.get('/tasks/:id', async (req, res) => {
  console.log(req.params.id)
  const task = await Task.findById(req.params.id)
  console.log(task)
  res.json(task)
})

app.post('/tasks/add', async (req, res) => {
  try {
    const task = await Task.create({
      text: req.body.text,
      day: req.body.day,
      reminder: req.body.reminder
    })
    res.json(task)
  } catch (err) {
    console.error(err)
  }
})

app.put('/tasks/update/:id', (req, res) => {
  query = { '_id': req.params.id }
  Task.findOneAndUpdate(query, req.body,
    (err, task) => {
      if (err) {
        console.error(err)
      } else {
        console.log(task)
      }
  })
})


app.delete('/tasks/delete/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    await Task.deleteOne(task)
    res.json(task)
  } catch (err) {
    console.error(err)
  }
})