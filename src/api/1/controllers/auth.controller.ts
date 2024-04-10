import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { RouteHandler } from '../../../types/custom'
import { usersDB } from '../../../services/database'

const saltRounds = 10

export const login: RouteHandler = async (req, res, next) => {
	try {
		// Is this type declaration necessary?
		const { username, password }: { username: string; password: string } = req.body
		if (!username || !password) return res.status(400).json({ message: 'missing params: username and password required' })

		// Check if user exists
		const user = await usersDB.getUser(null, username)
		if (!user) return res.status(401).json({ message: 'invalid username or password' })

		// Check if password is correct
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) return res.status(401).json({ message: 'invalid username or password' })

		// Create jwt token for session
		const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_KEY)
		res.json({ token })
	} catch (error) {
		return next(error)
	}
}

export const register: RouteHandler = async (req, res, next) => {
	try {
		const { username, email, password }: { username: string; email: string; password: string } = req.body
		if (!username || !email || !password) return res.status(400).json({ message: 'missing parameters: username/email/password' })

		// Check if username is taken
		const usernameAvailable = await usersDB.usernameAvailable(username)
		if (!usernameAvailable) return res.status(400).json({ message: 'username unavailable' })

		// Check if email is already associated with an account
		const emailAvailable = await usersDB.emailAvailable(email)
		if (!emailAvailable) return res.status(400).json({ message: 'email already associated with an account' })

		// Hashes user's password
		const hashedPassword = bcrypt.hashSync(password, saltRounds)

		const newUser = await usersDB.createUser(username, email, hashedPassword)

		// Create jwt for session
		const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_KEY)
		res.json({ token })
	} catch (error) {
		return next(error)
	}
}
