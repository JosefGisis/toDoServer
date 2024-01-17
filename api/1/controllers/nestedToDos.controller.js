const knex = require('../../../knexConnection.js')

module.exports.toDos = async function (req, res, next) {
	try {
        // need to check if listId is correct as toDos may come back empty whether list is valid or not
		const validList = await knex('lists').where('id', req.params.listId)
		if (!validList.length) return res.status(404).json({ status: 404, message: 'error performing request', data: null })

		const toDos = await knex('to_dos').where('membership', req.params.listId)

		res.json({ status: 200, message: '', data: toDos })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 500, message: 'error performing request. Please try again soon', data: null })
	}
}

module.exports.toDo = async function (req, res, next) {
	try {
		const toDo = await knex('to_dos').where('id', req.params.toDoId)
		if (!toDo.length) throw new Error('error getting to-do')

		res.json({status: 200, message: '', data: toDo})
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 500, message: 'error performing request. Please try again soon', data: null })
	}
}

module.exports.postToDo = async function (req, res, next) {
	try {
		const { title, due_date } = req.body
		if (!title) return res.status(400).json({ status: 400, message: 'title required', data: null })

		// postedToDo returns the id of the new to-do
		const postedId = await knex('to_dos').insert({
			users_id: req.body.authInfo.users_id,
			title: title,
			due_date: due_date || null,
			membership: req.params.listId,
		})
		if (!postedId[0]) throw new Error('error posting to-do')

        const newToDo = await knex('to_dos').where('id', postedId[0])
		res.json({ status: 200, message: 'new to-do posted', data: newToDo })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 500, message: 'error performing request. Please try again soon', data: null })
	}
}

module.exports.deleteToDo = async function (req, res, next) {
	try {
		const deleted = await knex('to_dos').where('id', req.params.toDoId).del()
		if (!deleted) throw new Error('error deleting to-do')

		res.json({ status: 200, message: `deleted ${deleted} to-do(s)`, data: null })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 500, message: 'error performing request. Please try again soon', data: null })
	}
}

module.exports.deleteToDos = async function (req, res, next) {
	try {
		const validList = await knex('lists').where('id', req.params.listId)
		if (!validList.length) throw new Error('list id is not valid')

		const deleted = await knex('to_dos').where('membership', req.params.listId).del()

		res.json({ status: 200, message: `deleted ${deleted} to-do(s)`, data: null })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 500, message: 'error performing request. Please try again soon', data: null })
	}
}

module.exports.putToDo = async function (req, res, next) {
	try {
		const { title, due_date, membership } = req.body
		if (!title) return res.status(400).json({ status: 400, message: 'title required', data: null })

		const updated = await knex('to_dos')
			.where('id', req.params.toDoId)
			.update({ title: title, due_date: due_date || null, membership: membership || req.params.listId })
        if (!updated) throw new Error('error updating to-do')

        const updatedToDo = await knex('to_dos').where('id', req.params.toDoId)

		res.send({ status: 200, message: 'updated to-do', data: updatedToDo })
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({ status: 500, message: 'error performing request. Please try again soon', data: null })
	}
}
