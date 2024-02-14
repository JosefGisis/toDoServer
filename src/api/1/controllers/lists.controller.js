const database = require('../../../services/database/index')

module.exports.lists = async function (req, res, next) {
	try {
		const { user, query } = req
		const {sortBy, order} = query
		const lists = await database.listsDB.getLists({ userId: user.id, sortBy, order })
		res.json({ data: lists })
	} catch (err) {
		next(err)
	}
}

module.exports.list = async function (req, res, next) {
	try {
		const list = await database.listsDB.getList({ listId: req.params.listId })
		if (!list) return res.status(404).json({ message: 'list not found' })
		return res.json({ data: list })
	} catch (err) {
		next(err)
	}
}

module.exports.createList = async function (req, res, next) {
	try {
		const { user, body: {title} } = req
		if (!title) return res.status(400).json({ message: 'list title required' })

		const newList = await database.listsDB.postList({ userId: user.id, title })
		res.json({ message: 'new list posted', data: newList })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteList = async function (req, res, next) {
	try {
		const quantityDeleted = await database.listsDB.deleteList({ listId: req.params.listId })
		res.json({ message: `deleted ${quantityDeleted} list(s)` })
	} catch (err) {
		next(err)
	}
}

module.exports.updateList = async function (req, res, next) {
	try {
		const { params: { listId }, body: { title, accessListOnly } } = req
		if (!title) return res.status(400).json({ message: 'list title required' })

		const updatedList = await database.listsDB.putList({ listId, title, accessListOnly })
		res.json({ message: 'list updated', data: updatedList })
	} catch (err) {
		next()
	}
}
