const knex = require('../../../knexConnection.js')

module.exports.lists = async function (req, res, next) {
	try {
		const lists = await knex('lists').where('users_id', req.body.authInfo.users_id)

		if (!lists.length) return res.status(200).json({status:200, message: 'no lists found', data: null})
        
		res.json({status: 200, message: '', data: lists})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.list = async function (req, res, next) {
	try {
		const list = await knex('lists').where('id', req.params.listId)

		if (!list.length) return res.status(400).json({status: 400, message: 'error getting list', data: null})
		
        res.json({status: 200, message: '', data: list})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.postList = async function (req, res, next) {
	try {
		const { title } = req.body
		if (!title) return res.status(400).json({status: 400, message: 'list title required', data: null})

		// returns the id of the newly created list
		const listId = await knex('lists').insert({ users_id: req.body.authInfo.users_id, title: req.body.title })
        
		res.json({status: 200, message: 'new list posted', data: listId})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).send({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.deleteList = async function (req, res, next) {
	try {
		// returns number of deleted lists
		const deletedList = await knex('lists').where('id', req.params.listId).del()
		
		if (!deletedList[0]) return res.status(400).json({status: 400, message: 'error deleting list', data: null})
		
		res.json({status: 200, message: 'list deleted', data: deletedList})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).send({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.putList = async function (req, res, next) {
	try {
		// returns the number of changed lists
		const putList = await knex('lists').where('id', req.params.listId).update('title', req.body.title)
		
		if (!putList[0]) return res.status(400).json({status: 400, message: 'error putting list', data: null})
		
		res.json({status: 200, message: 'list updated', data: putList})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).send({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}