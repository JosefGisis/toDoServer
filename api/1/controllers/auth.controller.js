const knex = require('../../../knexConnection.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10


exports.login = async function(req, res){
    const {username, password} = req.body
    console.log(username, password)

    try {
        const user = await knex('users').where({username: username})
        if (!user.length) throw new Error('invalid username or password')

        const validPassword = await bcrypt.compare(password, user[0].pass_word)
        if(!validPassword) throw new Error('invalid username or password')

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_KEY)
        res.json({successfulLogin: true, token})
    } catch(err) {
        console.log(err)
        res.status(500).json({message: err.message, stack: err.stack})
    }
}

exports.register = async function(req,res,next){
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
}