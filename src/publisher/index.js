import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import config from 'config'
import docsRouter from '../../docs/publisher/index'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

const publisher_controller = require('../controllers/publisher')
app.post('/publish/:topic', publisher_controller.publish)
app.use('/publisher/docs', docsRouter)

app.listen(config.get('port'), () => {
  console.log(`Publisher is currently running on port ${config.get('port')}`)
})
