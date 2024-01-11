const express = require('express')
const knex = require('./knexConnection')
const bcrypt = require('bcrypt')

const router = express.Router()
const saltRounds = 10



router.post('/', async (req, res) => {
    const {username, email, password} = req.body
    const hashedPassword = await bcrypt.hashSync(password, saltRounds)
    try {
        await knex('users').insert({username: username, email: email, pass_word:hashedPassword})
        res.send(`inserted ${ JSON.stringify({...req.body, password: hashedPassword} ) }`)
    } catch(err) {
        console.error('error posting new user', err)
        res.status(500).json({errno: err.errno, message: err.message, stack: err.stack})
    }
})

module.exports = router