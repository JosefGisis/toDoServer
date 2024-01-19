const knex = require('../../../knexConnection.js')

module.exports.lists = async function (req, res) {
	try {
		const validUser = await knex('users').where('id', req.body.authInfo.users_id)
		if (!validUser.length) return res.status(404).json({status: 404, message: 'error performing request', data: null})

		const lists = await knex('lists').where('users_id', req.body.authInfo.users_id)
        
		res.json({status: 200, message: '', data: lists})
		// next()
	} catch (err) {
		console.error(err)
		res.status(500).json({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.list = async function (req, res, next) {
	try {
		const list = await knex('lists').where('id', req.params.listId)
		if (!list.length) throw new Error('error performing request')
		
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
		const postedId = await knex('lists').insert({ users_id: req.body.authInfo.users_id, title: req.body.title })
		if (!postedId[0]) throw new Error('error posting new list')

		const newList = await knex('lists').where('id', postedId[0])
        
		res.json({status: 200, message: 'new list posted', data: newList})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).send({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.deleteList = async function (req, res, next) {
	try {
		// returns number of deleted lists
		const deleted = await knex('lists').where('id', req.params.listId).del()
		if (!deleted) throw new Error('error deleting list')
		
		res.json({status: 200, message: `deleted ${deleted} list(s)`, data: null})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).send({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}

module.exports.putList = async function (req, res, next) {
	try {
		const { title } = req.body
		if (!title) return res.status(400).json({status: 400, message: 'list title required', data: null})

		// returns the number of changed lists
		const updated = await knex('lists').where('id', req.params.listId).update('title', req.body.title)
		console.log(updated)
		if (!updated) throw new Error('error putting list')

		const updatedList = await knex('lists').where('id', req.params.listId)
		
		res.json({status: 200, message: 'list updated', data: updatedList})
		next()
	} catch (err) {
		// console.error(err)
		res.status(500).send({status: 500, message: 'error performing request. Please try again soon', data: null})
	}
}