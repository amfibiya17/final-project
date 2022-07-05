require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRoutes = require('./routes/users')

const app = express()

app.use(cors())

app.use('/users', userRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`)
})