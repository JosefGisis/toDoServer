const express = require('express')
const knex = require('./knexConnection')
const bcrypt = require('bcrypt')

const router = express.Router()
const saltRounds = 10

router.post('/', async (req, res, next) => {
    const {username, email, password} = req.body
    const hashedPassword = await bcrypt.hashSync(password, saltRounds)
    try {
        const existingUser = await knex('users').where({username})
        if(existingUser.length) return res.status(400).json({message:'username already exists'})


        await knex('users').insert({username: username, email: email, pass_word:hashedPassword})
        res.send(`inserted ${ JSON.stringify({...req.body, password: hashedPassword} ) }`)
    } catch(err) {
        next(err)
        // console.error('error posting new user', err)
        // res.status(500).json({message: err.message})
    }
})

module.exports = router