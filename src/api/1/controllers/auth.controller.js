const database = require('../../../services/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10

module.exports.login = async function (req, res, next) {
	try {
		const { username, password } = req.body
		if (!username || !password) return res.status(400).json({ message: 'missing params: username and password required' })

		const user = await database.usersDB.getUser({ username })
		if (!user) return res.status(401).json({ message: 'invalid username or password' })

		const validPassword = await bcrypt.compare(password, user.pass_word)
		if (!validPassword) return res.status(401).json({ message: 'invalid username or password' })

		const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_KEY)
		res.json({ message: 'login successful', token })
	} catch (err) {
		next(err)
	}
}

module.exports.register = async function (req, res, next) {
	try {
		const { username, email, password } = req.body
		if (!username || !email || !password) return res.status(400).json({ message: 'missing parameters: username/email/password required' })

		const usernameAvailable = database.usersDB.usernameAvailable({ username })
		if (!usernameAvailable) return res.status(400).json({ message: 'username unavailable' })

		const emailAvailable = database.usersDB.emailAvailable({ email })
		if (!emailAvailable) return res.status(400).json({ message: 'email already associated with an account' })

		const hashedPassword = bcrypt.hashSync(password, saltRounds)

		const newUserId = await database.usersDB.createUser({ username, email, password: hashedPassword })
		const newUser = await database.usersDB.getUser({ userId: newUserId })

		const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_KEY)
		res.json({ message: 'account created', token })
	} catch (err) {
		next(err)
	}
}
