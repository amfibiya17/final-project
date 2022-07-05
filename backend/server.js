const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.json({message: 'App Test'})
})

app.listen(4000, () => {
  console.log('Listening on Port 4000')
})
