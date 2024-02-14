const database = require('../../../services/database')

module.exports.profile = async function (req, res, next) {
	try {
		const { id, username } = req.user
		const user = await database.usersDB.getUser({ userId: id, username })
		res.send({ data: user })
	} catch (err) {
		next(err)
	}
}
