const knex = require('../../../services/database/knexConnection')
const database = require('../../../services/database')

module.exports.toDos = async function (req, res, next) {
	try {
		const toDos = await database.toDosDB.getToDos({ listId: req.params.listId })
		res.json({ status: 200, message: '', data: toDos })
	} catch (err) {
		next(err)
	}
}

module.exports.toDo = async function (req, res, next) {
	try {
		const toDo = await database.toDosDB.getToDo({ toDoId: req.params.toDoId })
		if (!toDo) throw new Error('error getting to-do')
		res.json({ status: 200, message: '', data: toDo })
	} catch (err) {
		next(err)
	}
}

module.exports.postToDo = async function (req, res, next) {
	try {
		const { title, due_date } = req.body
		if (!title) return res.status(400).json({ status: 400, message: 'title required', data: null })

		const postedId = await database.toDosDB.postToDo({
			userId: req.authInfo.users_id,
			listId: req.params.listId,
			dueDate: due_date,
			title,
		})
		if (!postedId) throw new Error('error posting to-do')

		const newToDo = await database.toDosDB.getToDo({ toDoId: postedId })
		res.json({ status: 200, message: 'new to-do posted', data: newToDo })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const quantityDeleted = await database.toDosDB.deleteToDo({ toDoId: req.params.toDoId })
		if (!quantityDeleted) throw new Error('error deleting to-do')
		res.json({ status: 200, message: `deleted ${quantityDeleted} to-do(s)`, data: null })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteToDos = async function (req, res, next) {
	try {
		const quantityDeleted = await database.toDosDB.deleteToDos({ listId: req.params.listId })
		if (!quantityDeleted) throw new Error('error deleting to-dos')
		res.json({ status: 200, message: `deleted ${quantityDeleted} to-do(s)`, data: null })
	} catch (err) {
		next(err)
	}
}

module.exports.putToDo = async function (req, res, next) {
	try {
		const { title, due_date, membership } = req.body
		if (!title) return res.status(400).json({ status: 400, message: 'title required', data: null })

		const updatedId = await database.toDosDB.putToDo({
			title,
			dueDate: due_date,
			listId: req.params.listId || membership,
			toDoId: req.params.toDoId,
		})
		if (!updatedId) throw new Error('error updating to-do')

		const updatedToDo = await knex('to_dos').where('id', req.params.toDoId)
		res.send({ status: 200, message: 'updated to-do', data: updatedToDo })
	} catch (err) {
		next(err)
	}
}