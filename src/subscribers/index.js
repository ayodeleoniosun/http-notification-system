import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

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
