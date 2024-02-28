const { toDosDB } = require('../../../services/database')

module.exports.listToDos = async function (req, res, next) {
	try {
		const toDos = await toDosDB.getListToDos({ listId: req.params.listId })
		res.json({ data: toDos })
	} catch (error) {
		next(error)
	}
}

module.exports.toDo = async function (req, res, next) {
	try {
		const toDo = await toDosDB.getToDo({ toDoId: req.params.toDoId })
		res.json({ data: toDo })
	} catch (error) {
		next(error)
	}
}

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const quantityDeleted = await toDosDB.deleteToDo({ toDoId: req.params.toDoId })
		res.json({ message: `deleted ${quantityDeleted} to-do(s)` })
	} catch (error) {
		next(error)
	}
}

module.exports.deleteListToDos = async function (req, res, next) {
	try {
		const { params, user } = req
		const quantityDeleted = await toDosDB.deleteListToDos({ listId: params.listId, userId: user.id })
		res.json({ message: `deleted ${quantityDeleted} to-do(s)` })
	} catch (error) {
		next(error)
	}
}

module.exports.createToDo = async function (req, res, next) {
	try {
		// Only title is required in the body. listId and userId is supplied by the request.
		const {
			user: { id: userId },
			params: { listId },
			body: { title, dueDate },
		} = req

		if (!title) return res.status(400).json({ message: 'title required' })

		// createToDo takes List object to create
		const newToDo = await toDosDB.createToDo({ title, dueDate, membership: listId, userId })
		res.json({ message: 'new to-do posted', data: newToDo })
	} catch (error) {
		next(error)
	}
}

module.exports.updateToDo = async function (req, res, next) {
	try {
		const {
			params: { toDoId },
			body: { title, dueDate, completed, membership },
		} = req

		/**
		 * updateToDo takes to-do's id and Update object containing to-do update information.
		 */
		const updatedToDo = await toDosDB.updateToDo(toDoId, { title, dueDate, membership, completed })
		res.send({ message: 'updated to-do', data: updatedToDo })
	} catch (error) {
		next(error)
	}
}
