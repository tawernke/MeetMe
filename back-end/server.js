const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || process.argv[2] || 8080

require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', require('./routes/meetMe'))

app.listen(port, () => {
  console.log(`listening on ${port}`)
})