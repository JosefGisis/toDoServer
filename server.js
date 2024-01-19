require('dotenv').config()

const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const v1 = require('./api/1/router')

// const helmet = require('helmet')
// const Joi = require('joi')
// const config = require('config')

const express = require('express')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('short'))
app.use('/api/1', v1)

app.use(passport.initialize())
// app.use(helmet())

const port = 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})