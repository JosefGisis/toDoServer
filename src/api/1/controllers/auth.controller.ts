import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import database from '../../../services/database'
import { RouteHandler } from '../../../types/express'

const saltRounds = 10

export const login: RouteHandler = async (req, res, next) => {
	try {
		const { username, password } = req.body
		if (!username || !password) return res.status(400).json({ message: 'missing params: username and password required' })

		// Check if user exists
		const user = await database.usersDB.getUser({ username })
		if (!user) return res.status(401).json({ message: 'invalid username or password' })

		// Check if password is correct
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) return res.status(401).json({ message: 'invalid username or password' })

		// Create jwt for session
		const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_KEY)
		res.json({ message: 'login successful', token })
	} catch (error) {
		next(error)
	}
}

export const register: RouteHandler = async (req, res, next) => {
	try {
		const { username, email, password } = req.body
		if (!username || !email || !password) return res.status(400).json({ message: 'missing parameters: username/email/password' })

		// Check if username is taken
		const usernameAvailable = await database.usersDB.usernameAvailable({ username })
		if (!usernameAvailable) return res.status(400).json({ message: 'username unavailable' })

		// Check if email is already associated with an account
		const emailAvailable = await database.usersDB.emailAvailable({ email })
		if (!emailAvailable) return res.status(400).json({ message: 'email already associated with an account' })

		// Hashes user's password
		const hashedPassword = bcrypt.hashSync(password, saltRounds)

		const newUser = await database.usersDB.createUser({ username, email, password: hashedPassword })

		// Create jwt for session
		const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_KEY)
		res.json({ message: 'account created', token })
	} catch (error) {
		next(error)
	}
}