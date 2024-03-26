import { usersDB } from '../../../services/database'
import { RouteHandler } from '../../../types/express'

export const profile: RouteHandler = async function (req, res, next) {
	try {
		const { id, username } = req.user
		const user = await usersDB.getUser({ userId: id, username })
		res.send({ data: user })
	} catch (error) {
		next(error)
	}
}
