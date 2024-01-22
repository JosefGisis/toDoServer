const knex = require('../../../services/database/knexConnection')

module.exports.toDos = async function (req, res, next) {
	try {
		// need to check if valid user a toDos may come back empty regardless if user is valid or not
		const validUser = await knex('users').where('id', req.authInfo.users_id)
		if (!validUser.length) return res.status(404).json({ status: 404, message: 'error performing request', data: null })

		const toDos = await knex('to_dos').where('users_id', req.authInfo.users_id)

		res.json({ status: 200, message: '', data: toDos })
	} catch (err) {
		next(err)
	}
}

module.exports.toDo = async function (req, res, next) {
	try {
		const toDo = await knex('to_dos').where('id', req.params.toDoId)
		if (!toDo.length) throw new Error('error performing request')

		res.json({ status: 200, message: '', data: toDo[0] })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const deleted = await knex('to_dos').where('id', req.params.toDoId).del()
		if (!deleted) throw new Error('error deleting resource')

		res.json({ status: 200, message: `deleted ${deleted} to-do(s)`, data: null })
	} catch (err) {
		next(err)
	}
}