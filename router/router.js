require('dotenv').config()

const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
// const Joi = require('joi')
const config = require('config')

console.log(config.get('name'))

const express = require('express')
const app = express()
const users = require('./usersRouter.js')
const lists = require('./listsRouter.js')
const toDos = require('./toDosRouter.js')
const register = require('./registerRouter.js')
const login = require('./loginRouter.js')

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('short'))
app.use('/api/users', users)
app.use('/api/lists', lists)
app.use('/api/to_dos', toDos)
app.use('/api/register', register)
app.use('/api/login', login)



const port = 3000

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})