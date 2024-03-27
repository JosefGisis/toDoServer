import { usersDB } from '../../../services/database'
import { RouteHandler } from '../../../types/custom'

export const profile: RouteHandler = async function (req, res, next) {
	try {
		const { id, username } = req.user
		const user = await usersDB.getUser( id, username )
		res.send({ data: user })
	} catch (error) {
		next(error)
	}
}
