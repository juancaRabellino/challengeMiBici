const express = require('express')
require('dotenv').config()
const cors = require('cors')
require('./src/configs/database')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})