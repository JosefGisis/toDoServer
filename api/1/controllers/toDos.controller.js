const knex = require('../../../knexConnection.js')

module.exports.toDos = async function (req, res, next) {
	try {
		const toDos = await knex('to_dos').where('users_id', req.body.authInfo.users_id)

		if (!toDos.length) return res.status(400).json({status: 400, message: 'user does not have to-dos', data: null})
		
		res.json({status: 200, message: '', data: toDos })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.toDo = async function (req, res, next) {
	try {
		const toDo = await knex('to_dos').where('users_id', req.body.authInfo.users_id).andWhere('membership', req.params.toDoId)
		
		if (!toDo.length) return res.status(400).json({status: 400, message: 'bad request', data: null})
		
		res.json({status: 200, message: '', data: toDo[0]})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.postToDo = async function (req, res, next) {
	const { title, due_date, membership } = req.body
	if (!title || !due_date || !membership) return res.status(400).json({status: 400, message: 'title and membership required', data: null})
	
	try {
		// returns the id of the new to-do
		const postedToDo = await knex('to_dos').insert({users_id: req.body.authInfo.users_id, title: title, due_date: due_date, membership: membership})
		
		res.json({status: 200, message: 'new to-do posted', data: postedToDo })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const deletedToDo = await knex('to_dos').where('users_id', req.body.authInfo.users_id).andWhere('toDoId', req.params.toDoId).del()
		
		if (!deletedToDo[0]) return res.status(400).json({status: 400, message: 'error deleting to-do', data: null})
		
		res.json({status: 200, message: 'list deleted', data: deletedToDo})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.deleteToDos = async function (req, res, next) {
	const { membership } = req.body
	if (!membership) return res.status(400).json({status: 400, message: 'membership required', data: null})

	try {
		const deletedToDos = await knex('to_dos').where('users_id', req.body.authInfo.users_id).andWhere('membership', req.body.membership).del()
		
		if (!deletedToDos[0]) return res.status(400).json({status: 400, message: 'error deleting to-dos', data: null})

		res.json({status: 200, message: 'deleted to-dos', data: deletedToDos })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.putToDo = async function (req, res, next) {
	const { title, due_date, membership } = req.body
	if (!title || !due_date || !membership) return res.status(400).json({status: 400, message: 'membership, title, and due-date required', data: null})

	try {
		const putToDo = await knex('to_dos').where('users_id', req.body.authInfo.users_id).andWhere('membership', req.params.toDoId).update({title: title, due_date: due_date, membership: membership})

		res.send({status: 200, message: 'error putting to-do', data: putToDo})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}
