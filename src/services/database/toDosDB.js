const knex = require('./knexConnection')
const mapToDoToDB = require('./toDoDBMapper').mapToDoToDB

module.exports.getToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: require userId')
	return await knex('to_dos').where('user_id', userId).andWhere('membership', null)
}

module.exports.getListToDos = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: require listId')
	return await knex('to_dos').where('membership', listId)
}

module.exports.getAllToDos = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: userId')
	return await knex('to_dos').where('user_id', userId)
}

module.exports.getToDo = async function ({ toDoId }) {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const toDo = await knex('to_dos').where('id', toDoId)
	return toDo[0]
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
	return await knex('to_dos').where('user_id', userId).andWhere('membership', null).del()
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
	return newToDo[0]
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
	return postedToDo[0]
}
