const knex = require('./knexConnection')

module.exports.toDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('to_dos').where('membership', listId)
}

module.exports.userToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: userId')
	return await knex('to_dos').where('users_id', userId)
}

module.exports.toDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const toDo = await knex('to_dos').where('id', toDoId)
	return toDo[0]
}

module.exports.postToDo = async function ({ userId, listId, title, dueDate }) {
	if (!userId || !listId || !title || !dueDate) throw new Error('missing parameter: usersId/listId/dueDate/title')
	const postedId = await knex('to_dos').insert({
		users_id: userId,
		title: title,
		due_date: dueDate,
		membership: listId,
	})
	return postedId[0]
}

module.exports.deleteToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	return await knex('to_dos').where('id', toDoId).del()
}

module.exports.deleteToDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('to_dos').where('membership', listId).del()
}

module.exports.putToDo = async function ({ listId, title, dueDate, toDoId }) {
	if (!toDoId || !listId || !title || !dueDate) throw new Error('missing parameter: toDoId/listId/dueDate/title')
	const postedId = await knex('to_dos').where('id', toDoId).update({
		title: title,
		due_date: dueDate,
		membership: listId,
	})
	return postedId[0]
}
