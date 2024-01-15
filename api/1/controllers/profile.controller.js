const knex = require('../../../knexConnection.js')

module.exports.profile = async function (req, res, next) {
	try {
		const user = await knex('users').where('id', req.body.authInfo.users_id)

		if (!user.length) return res.status(400).json({status: 400, message: 'error getting user', data: null})
		
        res.send({status: 200, message: '', data: user[0] })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}