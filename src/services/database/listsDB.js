const knex = require('./knexConnection')
const { mapListToDB, mapListFromDB } = require('./listDBMapper')

// // Search params are not necessary because lists are sorted on client
// /**
//  * @param {Object} params
//  * @param {number} params.userId
//  * @param {('id'|'title'|'last_updated'|'creation_date')} [params.sortBy='title']
//  * @param {('asc'|'desc')} [params.order='asc']
//  */
module.exports.getLists = async function ({ userId, sortBy = 'creation_date', order = 'desc' }) {
	if (!userId) throw new Error('missing parameter: userId')
	const lists = await knex('lists').where('user_id', userId).orderBy(sortBy, order)
	return lists.map(list => mapListFromDB(list))
	// sort order logic is currently handled in client
	// if (['id', 'title', 'last_modified', 'creation_date', 'last_accessed'].includes(sortBy) && ['asc', 'desc'].includes(order)) {
	// 	return await knex('lists').where('user_id', userId).orderBy(sortBy, order)
	// } else {
	// 	throw new Error('invalid sorting argument ')
	// }
}

module.exports.getList = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	const list = await knex('lists').where('id', listId)
	return mapListFromDB(list[0])
}

module.exports.deleteList = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('lists').where('id', listId).del()
}

/**
 * Create a list
 * @param {List} list object that contains new list values
 */
module.exports.createList = async function (list) {
	const { userId, title } = list
	if (!userId || !title) throw new Error('missing parameter: userId or title')

	const dbList = mapListToDB(list)
	const postedId = await knex('lists').insert({ ...dbList, last_modified: knex.raw('NOW()') })

	const newList = await knex('lists').where('id', postedId[0])
	return mapListFromDB(newList[0])
}

/**
 * Updates list
 * @param {number} listId
 * @param {List} update List object containing list update properties
 */
module.exports.updateList = async function (listId, update) {
	if (!listId) throw new Error('missing parameter: listId')

	const dbList = mapListToDB(update)
	await knex('lists')
		.where('id', listId)
		.update({ ...dbList, last_modified: knex.raw('NOW()') })

	const updatedList = await knex('lists').where('id', listId)
	if (!updatedList.length) throw new Error('Invalid parameter: listId')
	return mapListFromDB(updatedList[0])
}
