const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./src/routes/index')
require('./src/configs/database')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
