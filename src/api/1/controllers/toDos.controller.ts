import { toDosDB } from '../../../services/database'
import { RouteHandler } from '../../../types/custom'

// Get all non-list to-dos
export const toDos: RouteHandler = async (req, res, next) => {
	try {
		const toDos = await toDosDB.getToDos(req.user.id)
		res.json({ data: toDos })
	} catch (error) {
		next(error)
	}
}

export const toDosByList: RouteHandler = async (req, res, next) => {
	try {
		const toDos = await toDosDB.getToDosByList(req.body.membership)
		res.json({ data: toDos })
	} catch (error) {
		next(error)
	}
}

export const toDo: RouteHandler = async (req, res, next) => {
	try {
		const toDo = await toDosDB.getToDo(req.params.toDoId)
		res.json({ data: toDo })
	} catch (error) {
		next(error)
	}
}

export const deleteToDo: RouteHandler = async (req, res, next) => {
	try {
		const quantityDeleted = await toDosDB.deleteToDo(req.params.toDoId)
		res.json({ message: `deleted ${quantityDeleted} to-do(s)` })
	} catch (error) {
		next(error)
	}
}

export const deleteToDosByList: RouteHandler = async (req, res, next) => {
	try {
		const quantityDeleted = await toDosDB.deleteToDosByList(req.body.membership)
		res.json({ message: `deleted ${quantityDeleted} to-do(s)` })
	} catch (error) {
		next(error)
	}
}

export const createToDo: RouteHandler = async (req, res, next) => {
	try {
		/**
		 * Only title is required in the body. userId is supplied by the request.
		 */
		const {
			user: { id: userId },
			body: { title, dueDate, membership },
		} = req

		if (!title || !userId){
			res.status(400).json({ message: 'missing params: title/userId' })
		} else{
			const newToDo = await toDosDB.createToDo({ title, dueDate, userId, membership })
			 res.json({ message: 'new to-do posted', data: newToDo })
		}
	} catch (error) {
		 next(error)
	}
}

export const updateToDo: RouteHandler = async (req, res, next) => {
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
