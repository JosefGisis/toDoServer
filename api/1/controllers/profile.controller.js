const knex = require('../../../knexConnection.js')

module.exports.profile = async function (req, res, next) {
	try {
		const lists = await knex('users').where('id', req.body.authInfo.users_id)
		
        res.send({ data: lists })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}