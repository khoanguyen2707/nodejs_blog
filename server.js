const express = require('express')
const swaggerUi = require('swagger-ui-express')
const appRoute = require('./routes/app')
const swaggerDoc = require('./config/swagger')

const app = express()
const port = process.env.port || 3000
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }))

app.use('/', appRoute)

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))
