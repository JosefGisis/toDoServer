import knex from './knexConnection'
import { mapListToDB, mapListFromDB } from './listDBMapper'

import type { DBList, ToDBList } from './listDBMapper'

export const getLists = async (userId: number) => {
	if (!userId) throw new Error('missing parameter: userId')
	const lists: DBList[] = await knex('lists').where('user_id', userId)
	return lists.map(mapListFromDB)
}

// Get singular list
export const getList = async ( listId: string ) => {
	if (!listId) throw new Error('missing parameter: listId')
	const list: DBList[] = await knex('lists').where('id', listId)
	return mapListFromDB(list[0])
}

export const deleteList = async ( listId: string ) => {
	if (!listId) throw new Error('missing parameter: listId')

	const quantityDeleted: number = await knex('lists').where('id', listId).del()
	return quantityDeleted
}

export const createList = async (list: ToDBList ) => {
	const { userId, title } = list
	if (!userId || !title) throw new Error('missing parameter: userId/title')

	const dbList = mapListToDB(list)
	const postedId: number[] = await knex('lists').insert({ ...dbList, last_modified: knex.raw('NOW()') })

	const newList: DBList[] = await knex('lists').where('id', postedId[0])
	return mapListFromDB(newList[0])
}

export const updateList = async (listId: string, update: ToDBList) => {
	if (!listId) throw new Error('missing parameter: listId')

	const dbList = mapListToDB(update)
	await knex('lists')
		.where('id', listId)
		.update({ ...dbList, last_modified: knex.raw('NOW()')})

	const updatedList: DBList[] = await knex('lists').where('id', listId)
	if (!updatedList.length) throw new Error('Invalid parameter: listId')
	return mapListFromDB(updatedList[0])
}
