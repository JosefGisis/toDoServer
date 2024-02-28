const database = require('../../../services/database')

module.exports.toDos = async function (req, res, next) {
	try {
		const toDos = await database.toDosDB.getToDos({ userId: req.user.id })
		res.json({ data: toDos })
	} catch (err) {
		next(err)
	}
}

// Retrieves all user's to-dos. Not currently used
module.exports.allToDos = async function (req, res, next) {
	try {
		const toDos = await database.toDosDB.getAllToDos({ userId: req.user.id })
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
		 * Only title is required in the body. userId is supplied by the request.
		 */
		const {
			user: { id: userId },
			body: { title, dueDate },
		} = req

		if (!title) return res.status(400).json({ message: 'title required' })

		const newToDo = await database.toDosDB.createToDo({ title, dueDate, userId })
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

module.exports.updateToDo = async function (req, res, next) {
	try {
		/**
		 * Supply membership to move to-do to a list.
		 * Supply toggle to only toggle list's completed status.
		 * Supply due-date to update the to-do, or provide removeDueDate to remove due-date.
		 * */
		const {
			params: { toDoId },
			body: { title, dueDate, completed },
		} = req

		const updatedToDo = await database.toDosDB.updateToDo(toDoId, { title, dueDate, completed })
		res.send({ message: 'updated to-do', data: updatedToDo })
	} catch (err) {
		next(err)
	}
}
