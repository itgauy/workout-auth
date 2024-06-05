require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((_req, _res, _next) => {
  console.log(_req.path, _req.method)
  _next()
})

//routes
app.use('/api/workouts', workoutRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected on db and listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })