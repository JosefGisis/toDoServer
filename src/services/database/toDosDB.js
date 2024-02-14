const knex = require('./knexConnection')

// Get all not-list associated to-dos
module.exports.getToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: require userId')
	return await knex('to_dos').where('users_id', userId).andWhere('membership', null)
}

// Gets all of list's to-dos
module.exports.getListToDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: require listId')
	return await knex('to_dos').where('membership', listId)
}

// Gets all of users to-dos. No use for yet
module.exports.getAllToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: userId')
	return await knex('to_dos').where('users_id', userId)
}

// Get a specific to-do
module.exports.getToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const toDo = await knex('to_dos').where('id', toDoId)
	return toDo[0]
}

module.exports.createToDo = async function ({ userId, listId, title, dueDate }) {
	if (!userId || !title) throw new Error('missing parameter: usersId/title')
	const postedId = await knex('to_dos').insert({
		users_id: userId,
		title: title,
		due_date: dueDate || null,
		membership: listId || null,
	})
	const newToDo = await knex('to_dos').where('id', postedId[0])
	return newToDo[0]
}

module.exports.deleteToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	return await knex('to_dos').where('id', toDoId).del()
}

module.exports.deleteSelectedToDos = async function ({ toDoIds }) {
	if (!toDoIds) throw new Error('Missing parameter: toDoIds')
	if (!Array.isArray(toDoIds)) throw new Error('Invalid parameter: toDoIds needs to be of type Array')
	return await knex('to_dos').whereIn('id', toDoIds).del()
}

module.exports.deleteToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: require userId')
	return await knex('to_dos').where('users_id', userId).andWhere('membership', null).del()
}

module.exports.deleteListToDos = async function ({ listId }) {
	if (!listId ) throw new Error('missing parameter: require listId or userId')
	return await knex('to_dos').where('membership', listId).del()
}

module.exports.updateToDo = async function ({ title, dueDate, toDoId, membership, listId, toggle, removeDueDate }) {
	const toDo = await knex('to_dos').where('id', toDoId)
	if (!toDo.length) throw new Error('invalid parameter: toDoId')
	const { title: prevTitle, due_date: prevDueDate } = toDo[0]

	if (toggle) {
		await knex('to_dos')
			.where('id', toDoId)
			.update({
				completed: knex.raw('NOT ??', 'completed'),
				last_modified: knex.raw('NOW()'),
			})
	} else if (removeDueDate) {
		await knex('to_dos')
			.where('id', toDoId)
			.update({
				due_date: null,
				last_modified: knex.raw('NOW()'),
			})
	} else {
		await knex('to_dos')
			.where('id', toDoId)
			.update({
				title: title || prevTitle,
				due_date: dueDate || prevDueDate,
				membership: membership || listId,
				last_modified: knex.raw('NOW()'),
			})
	}

	const postedToDo = await knex('to_dos').where('id', toDoId)
	return postedToDo[0]
}
