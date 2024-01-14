const knex = require('../../../knexConnection.js')

exports.toDos = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
		} = req

		const toDos = await knex('to_dos').where('users_Id', users_Id)

		res.send({ data: toDos })
	} catch (err) {
		console.error(err)
		res.status(500).json('error performing request. Please try again soon')
	}
}

exports.toDo = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			params: { id },
		} = req

		const toDo = await knex('to_dos').where('users_Id', users_Id).andWhere('membership', id)

		res.send({ data: toDo })
	} catch (err) {
		console.error(err)
		res.status(500).json('error performing request. Please try again soon')
	}
}

exports.postToDo = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			body: { title, due_date, membership },
		} = req

		const postedToDo = await knex('to_dos').insert({ users_Id: users_Id, title: title, due_date: due_date, membership: membership })

		res.send({ data: postedToDo })
	} catch (err) {
		console.error(err)
		res.status(500).send('internal server error')
	}
}

exports.deleteToDo = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			params: { id },
		} = req

		const deletedToDo = await knex('to_dos').where('users_Id', users_Id).andWhere('id', id).del()

		res.send({ data: deletedToDo })
	} catch (err) {
		console.error(err)
		res.status(500).send('internal server error')
	}
}

exports.deleteToDos = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			params: { membership },
		} = req

		const deletedToDos = await knex('to_dos').where('users_Id', users_Id).andWhere('membership', membership).del()

		res.send({ data: deletedToDos })
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
			body: { title, due_date },
		} = req

		const putToDo = await knex('to_dos').where('users_Id', users_Id).andWhere('membership', id).update({title: title, due_date: due_date})

		res.send({ data: putToDo })
	} catch (err) {
		console.error(err)
		res.status(500).send('internal server error')
	}
}
