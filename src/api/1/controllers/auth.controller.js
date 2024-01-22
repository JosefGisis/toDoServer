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

		const validPassword = await bcrypt.compare(password, user[0].pass_word)
		if (!validPassword) return res.status(400).json({status: 401, message: 'invalid username or password', data: null})

		const token = jwt.sign({id: user[0].id}, process.env.JWT_KEY)
		res.json({status: 200, message: 'login successful', token})
	} catch (err) {
		next(err)
	}
}

module.exports.register = async function (req, res, next) {
	
	try {
		const { username, email, password } = req.body
		if (!username || !email || !password) return res.status(400).json({status: 400, message: 'error performing request', data: null})

		const usernameTaken = database.usersDB.usernameAvailable({ username })
		if (usernameTaken) return res.status(400).json({status: 400, message: 'username unavailable', data: null})

		const emailTaken = database.usersDB.emailAvailable({ email })
		if (emailTaken) return res.status(400).json({status: 400, message: 'email already associated with an account', data: null})

		const hashedPassword = await bcrypt.hashSync(password, saltRounds)
		
		const newUser = await database.usersDB.postUser({ username, email, password: hashedPassword })
		if (!newUser) throw new Error('error creating account')
		
		const token = jwt.sign({id: newUser[0].id}, process.env.JWT_KEY)
		res.json({status: 200, message: 'account created', token})
	} catch (err) {
        next(err)
	}
}
