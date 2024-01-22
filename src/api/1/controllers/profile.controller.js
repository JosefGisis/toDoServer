const knex = require('../../../services/database/knexConnection.js')

module.exports.profile = async function (req, res, next) {
	try {
		const user = await knex('users').where('id', req.authInfo.users_id)
		if (!user.length) throw new Error('error getting user')

		res.send({ status: 200, message: '', data: user })
	} catch (err) {
		next(err)
	}
}
