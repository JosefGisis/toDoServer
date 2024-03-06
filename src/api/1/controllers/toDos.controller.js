const { toDosDB } = require('../../../services/database')

// Get all non-list to-dos
module.exports.toDos = async function (req, res, next) {
	try {
		const toDos = await toDosDB.getToDos({ userId: req.user.id })
		res.json({ data: toDos })
	} catch (error) {
		next(error)
	}
}

module.exports.toDosByList = async function(req, res, next) {
	try {
		const toDos = await toDosDB.getToDosByList({ membership: req.body.membership })
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

module.exports.deleteToDosByList = async function (req, res, next) {
	try {
		const quantityDeleted = await toDosDB.deleteToDosByList({ membership: req.body.membership })
		res.json({ message: `deleted ${quantityDeleted} to-do(s)` })
	} catch (error) {
		next(error)
	}
}

module.exports.createToDo = async function (req, res, next) {
	try {
		/**
		 * Only title is required in the body. userId is supplied by the request.
		 */
		const {
			user: { id: userId },
			body: { title, dueDate, membership },
		} = req

		if (!title || !userId) return res.status(400).json({ message: 'missing params: title/userId' })

		const newToDo = await toDosDB.createToDo({ title, dueDate, userId, membership })
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
		 * UpdateToDo takes to-do's id and Update object containing update properties
		 */
		const updatedToDo = await toDosDB.updateToDo(toDoId, { title, dueDate, completed, membership })
		res.send({ message: 'updated to-do', data: updatedToDo })
	} catch (error) {
		next(error)
	}
}
