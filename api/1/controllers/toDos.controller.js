const knex = require('../../../knexConnection.js')

module.exports.toDos = async function (req, res, next) {
	try {
		const toDos = await knex('to_dos').where('users_id', req.body.authInfo.users_id)

		res.send({ data: toDos })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.toDo = async function (req, res, next) {
	try {
		const toDo = await knex('to_dos').where('users_id', req.body.authInfo.users_id).andWhere('membership', req.params.toDoId)

		res.send({ data: toDo })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.postToDo = async function (req, res, next) {
	try {
		const postedToDo = await knex('to_dos').insert({ users_id: req.body.authInfo.users_id, title: req.body.title, due_date: req.body.due_date, membership: req.body.membership })

		res.send({ data: postedToDo })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const deletedToDo = await knex('to_dos').where('users_id', req.body.authInfo.users_id).andWhere('toDoId', req.params.toDoId).del()

		res.send({ data: deletedToDo })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.deleteToDos = async function (req, res, next) {
	try {
		const deletedToDos = await knex('to_dos').where('users_id', req.body.authInfo.users_id).andWhere('membership', req.body.membership).del()

		res.send({ data: deletedToDos })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.putToDo = async function (req, res, next) {
	try {
		const putToDo = await knex('to_dos').where('users_id', req.body.authInfo.users_id).andWhere('membership', req.params.toDoId).update({title: req.body.title, due_date: req.body.due_date})

		res.send({ data: putToDo })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}
