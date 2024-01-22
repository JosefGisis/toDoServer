const knex = require('../../../src/services/database/knexConnection.js')

module.exports.toDos = async function (req, res, next) {
	try {
		const toDos = await knex('to_dos').where('membership', req.params.listId)
		res.json({ status: 200, message: '', data: toDos })
	} catch (err) {
		next(err)
	}
}

module.exports.toDo = async function (req, res, next) {
	try {
		const toDo = await knex('to_dos').where('id', req.params.toDoId)
		if (!toDo.length) throw new Error('error getting to-do')

		res.json({ status: 200, message: '', data: toDo })
	} catch (err) {
		next(err)
	}
}

module.exports.postToDo = async function (req, res, next) {
	try {
		const { title, due_date } = req.body
		if (!title) return res.status(400).json({ status: 400, message: 'title required', data: null })

		// postedToDo returns the id of the new to-do
		const postedId = await knex('to_dos').insert({
			users_id: req.authInfo.users_id,
			title: title,
			due_date: due_date || null,
			membership: req.params.listId,
		})
		if (!postedId[0]) throw new Error('error posting to-do')

		const newToDo = await knex('to_dos').where('id', postedId[0])
		res.json({ status: 200, message: 'new to-do posted', data: newToDo })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const deleted = await knex('to_dos').where('id', req.params.toDoId).del()
		if (!deleted) throw new Error('error deleting to-do')

		res.json({ status: 200, message: `deleted ${deleted} to-do(s)`, data: null })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteToDos = async function (req, res, next) {
	try {
		const validList = await knex('lists').where('id', req.params.listId)
		if (!validList.length) throw new Error('list id is not valid')

		const deleted = await knex('to_dos').where('membership', req.params.listId).del()

		res.json({ status: 200, message: `deleted ${deleted} to-do(s)`, data: null })
	} catch (err) {
		next()
	}
}

module.exports.putToDo = async function (req, res, next) {
	try {
		const { title, due_date, membership } = req.body
		if (!title) return res.status(400).json({ status: 400, message: 'title required', data: null })

		const updated = await knex('to_dos')
			.where('id', req.params.toDoId)
			.update({ title: title, due_date: due_date || null, membership: membership || req.params.listId })
		if (!updated) throw new Error('error updating to-do')

		const updatedToDo = await knex('to_dos').where('id', req.params.toDoId)

		res.send({ status: 200, message: 'updated to-do', data: updatedToDo })
	} catch (err) {
		next(err)
	}
}
