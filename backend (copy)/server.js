
const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const bodyParser = require("body-parser")
const port = process.env.PORT || 4001;

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'));

routes(app)

app.listen(port,()=>{
  console.log('ok server')
})
