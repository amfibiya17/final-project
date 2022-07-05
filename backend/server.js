require('dotenv').config()
const express = require('express')


const app = express()

app.get('/', (req, res) => {
  res.json({message: 'App Test'})
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`)
})