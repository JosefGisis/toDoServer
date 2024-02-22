const database = require('../../../services/database')

module.exports.listToDos = async function (req, res, next) {
	try {
		const toDos = await database.toDosDB.getListToDos({ listId: req.params.listId })
		res.json({ data: toDos })
	} catch (err) {
		next(err)
	}
}

module.exports.toDo = async function (req, res, next) {
	try {
		const toDo = await database.toDosDB.getToDo({ toDoId: req.params.toDoId })
		res.json({ data: toDo })
	} catch (err) {
		next(err)
	}
}

module.exports.createToDo = async function (req, res, next) {
	try {
		/**
		 * Only title is required in the body. listId and userId is supplied by the request.
		 */
		const {
			user: { id: userId },
			params: { listId },
			body: { title, dueDate },
		} = req

		if (!title) return res.status(400).json({ message: 'title required' })

		const newToDo = await database.toDosDB.createToDo({ title, dueDate, membership: listId, userId })
		res.json({ message: 'new to-do posted', data: newToDo })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const quantityDeleted = await database.toDosDB.deleteToDo({ toDoId: req.params.toDoId })
		res.json({ message: `deleted ${quantityDeleted} to-do(s)` })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteListToDos = async function (req, res, next) {
	try {
		const { params, user } = req
		const quantityDeleted = await database.toDosDB.deleteListToDos({ listId: params.listId, userId: user.id })
		res.json({ message: `deleted ${quantityDeleted} to-do(s)` })
	} catch (err) {
		next(err)
	}
}

module.exports.updateToDo = async function (req, res, next) {
	try {
		/**
		 * Supply membership to override listId and move to-do to another list.
		 * Supply toggle to only toggle list's completed status.
		 * Supply due-date to update the to-do, or provide null to remove to-do.
		 * */
		const {
			params: { toDoId },
			body: { title, dueDate, completed, membership },
		} = req

		const updatedToDo = await database.toDosDB.updateToDo(toDoId, { title, dueDate, membership, completed })
		res.send({ message: 'updated to-do', data: updatedToDo })
	} catch (err) {
		next(err)
	}
}
