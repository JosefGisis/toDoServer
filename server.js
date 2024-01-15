require('dotenv').config()

const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
// const Joi = require('joi')
const config = require('config')
const v1 = require('./api/1/router')
console.log(config.get('name'))

const express = require('express')

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('short'))
app.use('/api/1', v1)

const port = 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})