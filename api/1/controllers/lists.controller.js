const knex = require('../../../knexConnection.js')

exports.lists = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
		} = req

		const lists = await knex('lists').where('users_Id', users_Id)
		
        res.send({ data: lists })
	} catch (err) {
		console.error(err)
		res.status(500).json('error performing request. Please try again soon')
	}
}

exports.list = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			params: { id },
		} = req

		const list = await knex('lists').where('users_Id', users_Id).andWhere('membership', id)
		
        res.send({ data: list })
	} catch (err) {
		console.error(err)
		res.status(500).json('error performing request. Please try again soon')
	}
}

exports.postList = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			body: { title },
		} = req

		const postedList = await knex('lists').insert({ users_Id: users_Id, title: title })
		
        res.send({ data: postedList })
	} catch (err) {
		console.error(err)
		res.status(500).send('internal server error')
	}
}

exports.deleteList = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			params: { id },
		} = req

		const deletedList = await knex('lists').where('users_Id', users_Id).andWhere('membership', id).del()

		res.send({ data: deletedList })
	} catch (err) {
		console.error(err)
		res.status(500).send('internal server error')
	}
}

exports.putList = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			params: { id },
			body: { title },
		} = req

		const putList = await knex('lists').where('users_Id', users_Id).andWhere('membership', id).update('title', title)

		res.send({ data: putList })
	} catch (err) {
		console.error(err)
		res.status(500).send('internal server error')
	}
}