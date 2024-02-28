const knex = require('./knexConnection')
const { mapToDoToDB, mapToDoFromDB } = require('./toDoDBMapper')

module.exports.getToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: require userId')
	const toDos = await knex('to_dos').where('user_id', userId).andWhere('membership', null)
	return toDos.map(toDo => mapToDoFromDB(toDo))
}

module.exports.getListToDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: require listId')
	const toDos = await knex('to_dos').where('membership', listId)
	return toDos.map(toDo => mapToDoFromDB(toDo))
}

module.exports.getAllToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: userId')
	const toDos = await knex('to_dos').where('user_id', userId)
	return toDos.map(toDo => mapToDoFromDB(toDo))
}

module.exports.getToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const toDo = await knex('to_dos').where('id', toDoId)
	return mapToDoFromDB(toDo[0])
}

module.exports.deleteToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	return await knex('to_dos').where('id', toDoId).del()
}

module.exports.deleteToDos = async function ({ toDoIds }) {
	if (!toDoIds) throw new Error('Missing parameter: toDoIds')
	if (!Array.isArray(toDoIds)) throw new Error('Invalid parameter: toDoIds needs to be of type Array')
	return await knex('to_dos').whereIn('id', toDoIds).del()
}

module.exports.deleteListToDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: require listId or userId')
	return await knex('to_dos').where('membership', listId).del()
}
/**
 * Create a todo
 * @param {ToDo} toDo object containing new to-do params
 */
module.exports.createToDo = async function (toDo) {
	if (!toDo || typeof toDo !== 'object') throw new Error('Invalid or missing argument: toDo')
	const { userId, title } = toDo
	if (!userId || !title) throw new Error('missing parameter: usersId/title')

	const dbToDo = mapToDoToDB(toDo)
	const postedId = await knex('to_dos').insert({ ...dbToDo, last_modified: knex.raw('NOW()') })
	const newToDo = await knex('to_dos').where('id', postedId[0])
	return mapToDoFromDB(newToDo[0])
}

/**
 * Update single todo
 * @param {number} toDoId Id of the todo to update
 * @param {ToDo} update Object with new values to update
 **/
module.exports.updateToDo = async function (toDoId, update) {
	if (!toDoId) throw new Error('Invalid or missing argument: toDoId')
	const toDo = await knex('to_dos').where('id', toDoId)
	if (!toDo.length) throw new Error('invalid parameter: toDoId')

	const dbToDo = mapToDoToDB(update)
	await knex('to_dos')
		.where('id', toDoId)
		.update({ ...dbToDo, last_modified: knex.raw('NOW()') })

	const postedToDo = await knex('to_dos').where('id', toDoId)
	return mapToDoFromDB(postedToDo[0])
}
