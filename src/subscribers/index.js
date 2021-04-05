import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

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

class Subscriber {
  constructor(port) {
    this.port = port
  }

  run() {
    const subscriber_controller = require('../controllers/subscriber')
    app.post('/subscribe/:topic', subscriber_controller.subscribe)

    app.listen(this.port, () => {
      console.log(`Subscriber server started on port ${this.port}`)
    })
  }
}

const ports = [9000, 9001]

ports.forEach(port => {
  const subscriber = new Subscriber(port)
  subscriber.run()
})
