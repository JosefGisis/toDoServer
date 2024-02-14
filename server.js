// require('dotenv').config()

const cors = require('cors')
const morgan = require('morgan')
const passport = require('./src/api/1/middleware/auth.js').passport
// const auth = require('./src/api/1/middleware/auth')
const v1 = require('./src/api/1/router')
const port = 3000
// const helmet = require('helmet')
// const Joi = require('joi')
// const config = require('config')
const express = require('express')

const app = express()
app.use(passport.initialize())
// auth.init(passport)

// pre passport refactor finalization
console.log(passport)

app.use(express.json())
app.use(cors())
app.use(morgan('short'))

app.use('/api/1', v1(passport))

// app.use(helmet())
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message })
    next() //just to remove red squiggly lines >:(
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

// module.exports.passport = passport