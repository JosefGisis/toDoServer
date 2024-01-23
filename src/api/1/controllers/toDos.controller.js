const database = require('../../../services/database')

module.exports.toDos = async function (req, res, next) {
	try {
		const toDos = await database.toDosDB.getUserToDos({ userId: req.user.id })
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

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const quantityDeleted = await database.toDosDB.deleteToDo({ toDoId: req.params.toDoId })
		if (!quantityDeleted) throw new Error('error deleting to-do')
		res.json({ status: 200, message: `deleted ${quantityDeleted} to-do(s)`, data: null })
	} catch (err) {
		next(err)
	}
}