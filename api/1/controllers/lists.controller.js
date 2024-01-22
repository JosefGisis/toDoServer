const database = require('../../../src/services/database')

module.exports.lists = async function (req, res, next) {
	try {
		const lists = await database.lists.lists({ userId: req.user.id })
		res.json({ status: 200, message: '', data: lists })
	} catch (err) {
		next(err)
	}
}

module.exports.list = async function (req, res, next) {
	try {
		const list = await database.lists.list({ listId: req.params.listId })
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

		const postedId = await database.lists.postList({ userId: req.user.id, title })
		if (!postedId) throw new Error('error posting new list')

		const newList = await database.lists.list({ listId: req.params.listId })
		res.json({ status: 200, message: 'new list posted', data: newList })
	} catch (err) {
		next(err)
	}
}

module.exports.deleteList = async function (req, res, next) {
	try {
		const quantityDeleted = await database.lists.deleteList({ listId: req.params.listId })
		if (!quantityDeleted) throw new Error('error deleting list')
		res.json({ status: 200, message: `deleted ${quantityDeleted} list(s)`, data: null })
	} catch (err) {
		next(err)
	}
}

module.exports.putList = async function (req, res, next) {
	try {
		const { title } = req.body
		if (!title) return res.status(400).json({ status: 400, message: 'list title required', data: null })

		const quantityUpdated = await database.lists.putList({ listId: req.params.listId, title })
		if (!quantityUpdated) throw new Error('error putting list')

		const updatedList = await database.lists.list({listId: req.params.listId,})
		res.json({ status: 200, message: 'list updated', data: updatedList })
	} catch (err) {
		next()
	}
}
