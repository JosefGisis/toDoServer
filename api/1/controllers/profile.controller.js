const knex = require('../../../knexConnection.js')

exports.profile = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
		} = req

		const lists = await knex('lists').where('id', users_Id)
		
        res.send({ data: lists })
	} catch (err) {
		console.error(err)
		res.status(500).json('error performing request. Please try again soon')
	}
}