const knex = require('./knexConnection')

module.exports.getToDos = async function ({listId, userId}) {
	if (!listId && !userId) throw new Error('missing parameter: require listId or userId')
	if (listId) return await knex('to_dos').where('membership', listId)
	return await knex('to_dos').where('users_id', userId).andWhere('membership', null)
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

module.exports.deleteToDos = async function ({ listId, userId }) {
	if (!listId && !userId) throw new Error('missing parameter: require listId or userId')
	if (listId) return await knex('to_dos').where('membership', listId).del()
	return await knex('to_dos').where('users_id', userId).andWhere('membership', null).del()
}

module.exports.putToDo = async function ({ membership, title, dueDate, toDoId }) {
	if (!toDoId || !title) throw new Error('missing parameter: toDoId/listId/title')

	const toDo = await knex('to_dos').where('id', toDoId)
	const prevDueDate = toDo[0].due_date
	const prevMembership = toDo[0].membership

	await knex('to_dos').where('id', toDoId).update({
		title: title,
		due_date: dueDate || prevDueDate,
		membership: membership || prevMembership,
		last_modified: knex.raw('NOW()')
	})
	
	const postedToDo = await knex('to_dos').where('id', toDoId)
	return postedToDo[0]
}

module.exports.toggleToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')

	await knex('to_dos').where('id', toDoId).update({
		completed: knex.raw('NOT ??', 'completed'),
		last_modified: knex.raw('NOW()')
	})
	
	const postedToDo = await knex('to_dos').where('id', toDoId)
	return postedToDo[0]
}