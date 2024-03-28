import knex from './knexConnection'
import { mapToDoToDB, mapToDoFromDB } from './toDoDBMapper'
import type { DBToDo, ToDBToDo } from './toDoDBMapper'

// Gets all of user's to-dos
export const getToDos = async (userId: number) => {
	if (!userId) throw new Error('missing parameter: userId')
	const toDos: DBToDo[] = await knex('to_dos').where('user_id', userId)
	return toDos.map(mapToDoFromDB)
}

// Get singular to-do
export const getToDo = async (toDoId: string) => {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const toDo: DBToDo[] = await knex('to_dos').where('id', toDoId)
	return mapToDoFromDB(toDo[0])
}

// Gets all of a lists to-dos
export const getToDosByList = async (membership: number) => {
	if (!membership) throw new Error('missing parameter: require listId')
	const toDos: DBToDo[] = await knex('to_dos').where('membership', membership)
	return toDos.map(mapToDoFromDB)
}

// Delete singular to-do
export const deleteToDo = async (toDoId: string) => {
	if (!toDoId) throw new Error('missing parameter: toDoId')
	const quantityDeleted: number = await knex('to_dos').where('id', toDoId).del()
	return quantityDeleted
}

// takes a list of toDoIds and deletes them. Does not delete all unassociated to-dos
export const deleteToDos = async (toDoIds: number[]) => {
	if (!toDoIds) throw new Error('Missing parameter: toDoIds')
	if (!Array.isArray(toDoIds)) throw new Error('Invalid parameter: toDoIds needs to be of type Array')
	const quantityDeleted: number = await knex('to_dos').whereIn('id', toDoIds).del()
	return quantityDeleted
}

// Empties list of to-dos
export const deleteToDosByList = async (membership: number) => {
	if (!membership) throw new Error('missing parameter: require listId or userId')
	const quantityDeleted: number = await knex('to_dos').where('membership', membership).del()
	return quantityDeleted
}

export const createToDo = async (toDo: ToDBToDo) => {
	if (!toDo || typeof toDo !== 'object') throw new Error('Invalid or missing argument: toDo')
	const { userId, title } = toDo
	if (!userId || !title) throw new Error('missing parameter: usersId/title')

	const dbToDo = mapToDoToDB(toDo)
	const postedId: number[] = await knex('to_dos').insert({ ...dbToDo, last_modified: knex.raw('NOW()') })
	const newToDo: DBToDo[] = await knex('to_dos').where('id', postedId[0])
	return mapToDoFromDB(newToDo[0])
}

export const updateToDo = async (toDoId: string, update: ToDBToDo) => {
	if (!toDoId) throw new Error('Invalid or missing argument: toDoId')
	
	// Check if to-do exists
	const toDo: DBToDo[] = await knex('to_dos').where('id', toDoId)
	if (!toDo.length) throw new Error('invalid parameter: toDoId')

	const dbToDo = mapToDoToDB(update)
	
	await knex('to_dos')
		.where('id', toDoId)
		.update({ ...dbToDo, last_modified: knex.raw('NOW()') })

	const postedToDo: DBToDo[] = await knex('to_dos').where('id', toDoId)
	return mapToDoFromDB(postedToDo[0])
}
