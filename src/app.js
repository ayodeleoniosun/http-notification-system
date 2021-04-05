import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from 'config'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

const allowed_origins = ['http://localhost:3000']

app.use( (req, res, next) => {
  const origin = req.headers.origin

  if (allowed_origins.indexOf(origin) > -1)
    res.setHeader('Access-Control-Allow-Origin', origin)
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  next()
})

const publisher_controller = require('./controllers/publisher')
app.post('/publish/:topic', publisher_controller.publish)

app.listen(config.get('port'), () => {
  console.log(`Publisher is currently running on port ${config.get('port')}`)
})
