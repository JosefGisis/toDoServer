const knex = require('../../../services/database/knexConnection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

module.exports.login = async function (req, res, next) {
	try {
		const { username, password } = req.body
		if (!username || !password) return res.status(400).json({status: 400, message: 'error performing request', data: null})

		const user = await knex('users').where('username', username)
		if (!user.length) return res.status(400).json({status: 401, message: 'invalid username or password', data: null})

		const validPassword = await bcrypt.compare(password, user[0].pass_word)
		if (!validPassword) return res.status(400).json({status: 401, message: 'invalid username or password', data: null})

		const token = jwt.sign({id: user[0].id}, process.env.JWT_KEY)
		res.json({status: 200, message: 'login successful', token})
        next()
	} catch (err) {
		console.log(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.register = async function (req, res, next) {
	
	try {
		const { username, email, password } = req.body
		if (!username || !email || !password) return res.status(400).json({status: 400, message: 'error performing request', data: null})

		const usernameTaken = await knex('users').where('username', username)
		if (usernameTaken.length) return res.status(400).json({status: 400, message: 'username unavailable', data: null})

		const emailTaken = await knex('users').where('email', email)
		if (emailTaken.length) return res.status(400).json({status: 400, message: 'email already associated with an account', data: null})

		const hashedPassword = await bcrypt.hashSync(password, saltRounds)
		
		const newUser = await knex('users').insert({username: username, email: email, pass_word: hashedPassword})
		if (!newUser.length) throw new Error('error creating account')
		
		const token = jwt.sign({id: newUser[0].id}, process.env.JWT_KEY)
		res.json({status: 200, message: 'account created', token})
        next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}
