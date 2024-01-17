const knex = require('../../../knexConnection.js')

module.exports.profile = async function (req, res, next) {
	try {
		const user = await knex('users').where('id', req.body.authInfo.users_id)
		if (!user.length) throw new Error('error getting user')
		
        res.send({status: 200, message: '', data: user })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}