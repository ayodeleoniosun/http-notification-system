import path from 'path'
import swaggerUi from 'swagger-ui-express'
import express from 'express'
import YamlJS from 'yamljs'

const docsRouter = express.Router()
const docsPath = path.resolve(__dirname, './index.yaml')
const swaggerDocument = YamlJS.load(docsPath)

docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default docsRouter
