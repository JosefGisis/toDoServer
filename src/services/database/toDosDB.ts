import knex from './knexConnection'
import { mapToDoToDB, mapToDoFromDB } from './toDoDBMapper'

// Gets all of user's to-dos
export const getToDos = async ( userId: number ) => {
	if (!userId) throw new Error('missing parameter: userId')
	const toDos = await knex('to_dos').where('user_id', userId)
	return toDos.map((toDo) => mapToDoFromDB(toDo))
}

// Get singular to-do
export const getToDo = async ( toDoId: number ) => {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const toDo = await knex('to_dos').where('id', toDoId)
	return mapToDoFromDB(toDo[0])
}

// Gets all of a lists to-dos
export const getToDosByList = async ( membership: number ) => {
	if (!membership) throw new Error('missing parameter: require listId')
	const toDos = await knex('to_dos').where('membership', membership)
	return toDos.map((toDo) => mapToDoFromDB(toDo))
}

// Delete singular to-do
export const deleteToDo = async ({ toDoId }) => {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	return await knex('to_dos').where('id', toDoId).del()
}

// takes a list of toDoIds and deletes them. Does not delete all unassociated to-dos
export const deleteToDos = async ({ toDoIds }) => {
	if (!toDoIds) throw new Error('Missing parameter: toDoIds')
	if (!Array.isArray(toDoIds)) throw new Error('Invalid parameter: toDoIds needs to be of type Array')
	return await knex('to_dos').whereIn('id', toDoIds).del()
}

// Empties list of to-dos
export const deleteToDosByList = async ( membership: number ) => {
	if (!membership) throw new Error('missing parameter: require listId or userId')
	return await knex('to_dos').where('membership', membership).del()
}
/**
 * Create a todo
 * @param {ToDo} toDo object containing new to-do params
 */
export const createToDo = async (toDo: ToDo) => {
	if (!toDo || typeof toDo !== 'object') throw new Error('Invalid or missing argument: toDo')
	const { userId, title } = toDo
	if (!userId || !title) throw new Error('missing parameter: usersId/title')

	const dbToDo = mapToDoToDB(toDo)
	const postedId = await knex('to_dos').insert({ ...dbToDo, last_modified: knex.raw('NOW()') })
	const newToDo = await knex('to_dos').where('id', postedId[0])
	return mapToDoFromDB(newToDo[0])
}

/**
 * Update to-do
 * @param {number} toDoId Id of the todo to update
 * @param {ToDo} update Object with new values to update
 **/
export const updateToDo = async (toDoId: number, update: Update) => {
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
