const knex = require('./knexConnection')

module.exports.getToDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('to_dos').where('membership', listId)
}

module.exports.getUserToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: userId')
	return await knex('to_dos').where('users_id', userId)
}

module.exports.getToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const toDo = await knex('to_dos').where('id', toDoId)
	return toDo[0]
}

module.exports.postToDo = async function ({ userId, listId, title, dueDate }) {
	if (!userId || !listId || !title) throw new Error('missing parameter: usersId/listId/title')
	const postedId = await knex('to_dos').insert({
		users_id: userId,
		title: title,
		due_date: dueDate || null,
		membership: listId,
	})
	const newToDo = await knex('to_dos').where('id', postedId[0]) 
	return newToDo[0]
}

module.exports.deleteToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	return await knex('to_dos').where('id', toDoId).del()
}

module.exports.deleteToDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('to_dos').where('membership', listId).del()
}

module.exports.putToDo = async function ({ listId, membership, title, dueDate, toDoId }) {
	if (!toDoId || !listId || !title) throw new Error('missing parameter: toDoId/listId/title')

	const toDo = await knex('to_dos').where('id', toDoId)
	const prevDueDate = toDo[0].due_date

	await knex('to_dos').where('id', toDoId).update({
		title: title,
		due_date: dueDate || prevDueDate,
		membership: membership || listId,
		last_updated: knex.raw('NOW()')
	})
	
	const postedToDo = await knex('to_dos').where('id', toDoId)
	return postedToDo[0]
}
