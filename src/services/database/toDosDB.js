const knex = require('./knexConnection')

module.exports.getListToDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('to_dos').where('membership', listId)
}

module.exports.getToDos = async function () {
	return await knex('to_dos').where('membership', null)
}

module.exports.getToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const toDo = await knex('to_dos').where('id', toDoId)
	return toDo[0]
}

module.exports.postToDo = async function ({ userId, listId, title, dueDate }) {
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
		last_modified: knex.raw('NOW()')
	})
	
	const postedToDo = await knex('to_dos').where('id', toDoId)
	return postedToDo[0]
}