const database = require('../../../services/database/index')

module.exports.lists = async function (req, res, next) {
	try {
		// destructure  params
		const { user, query } = req
		const {sortBy, order} = query
		const lists = await database.listsDB.getLists({ userId: user?.id, sortBy, order })
		res.json({ status: 200, message: '', data: lists })
	} catch (err) {
		next(err)
	}
}

module.exports.list = async function (req, res, next) {
	try {
		const list = await database.listsDB.getList({ listId: req.params.listId })
		if (!list) return res.status(404).json({ message: 'list not found' })
		return res.json({ status: 200, message: '', data: list })
	} catch (err) {
		next(err)
	}
}

module.exports.postList = async function (req, res, next) {
	try {
		const { title } = req.body
		if (!title) return res.status(400).json({ message: 'list title required' })

		const newList = await database.listsDB.postList({ userId: req.user.id, title })
		res.json({ status: 200, message: 'new list posted', data: newList })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteList = async function (req, res, next) {
	try {
		const quantityDeleted = await database.listsDB.deleteList({ listId: req.params.listId })
		if (!quantityDeleted) throw new Error('error deleting list')
		res.json({ status: 200, message: `deleted ${quantityDeleted} list(s)`, data: quantityDeleted })
	} catch (err) {
		next(err)
	}
}

module.exports.putList = async function (req, res, next) {
	try {
		const { title } = req.body
		if (!title) return res.status(400).json({ status: 400, message: 'list title required', data: null })

		const updatedList = await database.listsDB.putList({ listId: req.params.listId, title })
		res.json({ status: 200, message: 'list updated', data: updatedList })
	} catch (err) {
		next()
	}
}
