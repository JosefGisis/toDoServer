const express = require('express')
const knex = require('./knexConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = express.Router()

router.post('/', async (req, res) => {
    const {username, password} = req.body
    console.log(username, password)

    try {
        const user = await (await knex('users').where({username: username}))
        if (!user.length) throw new Error('invalid username or password')

        const validPassword = await bcrypt.compare(password, user[0].pass_word)
        if(!validPassword) throw new Error('invalid username or password')

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_KEY)
        res.json({successfulLogin: true, token})
    } catch(err) {
        console.log(err)
        res.status(500).json({message: err.message, stack: err.stack})
    }
})

module.exports = router