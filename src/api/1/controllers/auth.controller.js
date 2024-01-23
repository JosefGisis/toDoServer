const database = require('../../../services/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

module.exports.login = async function (req, res, next) {
	try {
		const { username, password } = req.body
		if (!username || !password) return res.status(400).json({status: 400, message: 'error performing request', data: null})

		const user = await database.usersDB.getUser({ username })
		if (!user) return res.status(400).json({status: 401, message: 'invalid username or password', data: null})

		const validPassword = await bcrypt.compare(password, user.pass_word)
		if (!validPassword) return res.status(400).json({status: 401, message: 'invalid username or password', data: null})

		const token = jwt.sign({id: user.id}, process.env.JWT_KEY)
		res.json({status: 200, message: 'login successful', token})
	} catch (err) {
		next(err)
	}
}

module.exports.register = async function (req, res, next) {
	
	try {
		const { username, email, password } = req.body
		if (!username || !email || !password) return res.status(400).json({status: 400, message: 'error performing request', data: null})

		const usernameAvailable = database.usersDB.usernameAvailable({ username })
		if (!usernameAvailable) return res.status(400).json({status: 400, message: 'username unavailable', data: null})

		const emailAvailable = database.usersDB.emailAvailable({ email })
		if (!emailAvailable) return res.status(400).json({status: 400, message: 'email already associated with an account', data: null})

		const hashedPassword = await bcrypt.hashSync(password, saltRounds)
		
		const newUser = await database.usersDB.postUser({ username, email, password: hashedPassword })
		if (!newUser) throw new Error('error creating account')
		
		const token = jwt.sign({id: newUser.id}, process.env.JWT_KEY)
		res.json({status: 200, message: 'account created', token, newUser})
	} catch (err) {
        next(err)
	}
}
