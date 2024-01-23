const database = require('../../../services/database')

module.exports.profile = async function (req, res, next) {
	try {
		const user = await database.usersDB.getUser({ userId: req.user.id })
		if (!user) throw new Error('error getting user')
		res.send({ status: 200, message: '', data: user })
	} catch (err) {
		next(err)
	}
}
