if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Task = require('./Tasks')

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("connected to mongodb")
}, e => console.error(e))


new Task({ })

app.listen(3000)