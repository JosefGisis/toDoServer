import { RouteHandler } from '../../../types/custom'
import { listsDB } from '../../../services/database/index'

export const lists: RouteHandler = async (req, res, next) => {
	try {
		const lists = await listsDB.getLists(req.user.id)
		res.json({ data: lists })
	} catch (error) {
		next(error)
	}
}

export const list: RouteHandler = async (req, res, next) => {
	try {
		const list = await listsDB.getList(req.params.listId)

		if (!list) {
			res.status(404).json({ message: 'list not found' })
		} else {
			res.json({ data: list })
		}
	} catch (error) {
		next(error)
	}
}

export const deleteList: RouteHandler = async (req, res, next) => {
	try {
		const quantityDeleted = await listsDB.deleteList(req.params.listId)
		res.json({ message: `deleted ${quantityDeleted} list(s)` })
	} catch (error) {
		next(error)
	}
}

export const createList: RouteHandler = async (req, res, next) => {
	try {
		const {
			user,
			body: { title },
		} = req

		if (!title) {
			res.status(400).json({ message: 'list title required' })
		} else {
			const newList = await listsDB.createList({ userId: user.id, title })
			res.json({ message: 'new list posted', data: newList })
		}
	} catch (error) {
		next(error)
	}
}

export const updateList: RouteHandler = async function (req, res, next) {
	try {
		const {
			params: { listId },
			body: { title },
		} = req

		const updatedList = await listsDB.updateList(listId, { title })
		res.json({ message: 'list updated', data: updatedList })
	} catch (error) {
		next(error)
	}
}
