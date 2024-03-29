import knex from './knexConnection'
import { mapListToDB, mapListFromDB } from './listDBMapper'

import type { DBList, ToDBList } from './listDBMapper'

export const getLists = async (userId: number) => {
	if (!userId) throw new Error('missing parameter: userId')
	const lists: DBList[] = await knex('lists').where('user_id', userId)

	if (!lists.length) return []
	return lists.map(mapListFromDB)
}

// Get singular list
export const getList = async (listId: string) => {
	if (!listId) throw new Error('missing parameter: listId')
	const lists: DBList[] = await knex('lists').where('id', listId)

	if (!lists.length) throw new Error('Error getting list. Possible incorrect list id')
	return mapListFromDB(lists[0])
}

export const deleteList = async (listId: string) => {
	if (!listId) throw new Error('missing parameter: listId')

	const quantityDeleted: number = await knex('lists').where('id', listId).del()
	return quantityDeleted
}

export const createList = async (list: ToDBList) => {
	const { userId, title } = list
	if (!userId || !title) throw new Error('missing parameter: userId/title')

	// convert list parameters to be usable by the db api
	const dbList = mapListToDB(list)
	const postedIds: number[] = await knex('lists').insert({ ...dbList, last_modified: knex.raw('NOW()') })
	if (!postedIds.length) throw new Error('Error creating list')

	const newLists: DBList[] = await knex('lists').where('id', postedIds[0])
	if (!newLists.length) throw new Error('Error creating/getting new list')
	return mapListFromDB(newLists[0])
}

export const updateList = async (listId: string, update: ToDBList) => {
	if (!listId) throw new Error('missing parameter: listId')

	// Check if list exists
	const lists: DBList[] = await knex('lists').where('id', listId)
	if (!lists.length) throw new Error('invalid parameter: listId')

	const dbList = mapListToDB(update)
	await knex('lists')
		.where('id', listId)
		.update({ ...dbList, last_modified: knex.raw('NOW()') })

	const updatedList: DBList[] = await knex('lists').where('id', listId)
	if (!updatedList.length) throw new Error('Invalid parameter: listId')
	return mapListFromDB(updatedList[0])
}
