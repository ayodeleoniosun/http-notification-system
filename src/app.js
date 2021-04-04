import express from 'express'
import config from 'config'

const app = express()

app.listen(config.get('port'), () => {
  console.log(`${config.get('appName')} is currently running on port ${config.get('port')}`)
})
