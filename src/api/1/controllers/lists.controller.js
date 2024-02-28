const { listsDB } = require('../../../services/database/index')

module.exports.lists = async function (req, res, next) {
	try {
		const { user } = req
		const lists = await listsDB.getLists({ userId: user.id })
		res.json({ data: lists })
	} catch (error) {
		next(error)
	}
}

module.exports.list = async function (req, res, next) {
	try {
		const list = await listsDB.getList({ listId: req.params.listId })
		if (!list) return res.status(404).json({ message: 'list not found' })
		return res.json({ data: list })
	} catch (error) {
		next(error)
	}
}

module.exports.deleteList = async function (req, res, next) {
	try {
		const quantityDeleted = await listsDB.deleteList({ listId: req.params.listId })
		res.json({ message: `deleted ${quantityDeleted} list(s)` })
	} catch (error) {
		next(error)
	}
}

module.exports.createList = async function (req, res, next) {
	try {
		const {
			user,
			body: { title },
		} = req
		if (!title) return res.status(400).json({ message: 'list title required' })

		const newList = await listsDB.createList({ userId: user.id, title })
		res.json({ message: 'new list posted', data: newList })
	} catch (error) {
		next(error)
	}
}

module.exports.updateList = async function (req, res, next) {
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
