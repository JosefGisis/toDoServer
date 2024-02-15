const knex = require('./knexConnection')

// Search params are not necessary because lists are sorted on client
/**
 * @param {Object} params
 * @param {number} params.userId
 * @param {('id'|'title'|'last_updated'|'creation_date')} [params.sortBy='title']
 * @param {('asc'|'desc')} [params.order='asc']
 */
module.exports.getLists = async function ({ userId, sortBy = 'id', order = 'asc' }) {
	if (!userId) throw new Error('missing parameter: userId')
	if (['id', 'title', 'last_modified', 'creation_date', 'last_accessed'].includes(sortBy) && ['asc', 'desc'].includes(order)) {
		return await knex('lists').where('user_id', userId).orderBy(sortBy, order)
	} else {
		throw new Error('invalid sorting argument ')
	}
}

module.exports.getList = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	const list = await knex('lists').where('id', listId)
	return list[0]
}

// postList creates a new list and retrieves the new list from the db
module.exports.createList = async function ({ userId, title }) {
	if (!userId || !title) throw new Error('missing parameter: userId or title')
	const postedId = await knex('lists').insert({
		user_id: userId,
		title,
		last_accessed: knex.raw('NOW()'),
		last_modified: knex.raw('NOW()')
	})
	const newList = await knex('lists').where('id', postedId[0])
	return newList[0]
}

module.exports.deleteList = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('lists').where('id', listId).del()
}

module.exports.updateList = async function ({ listId, title, accessListOnly }) {
	if (!listId) throw new Error('missing parameter: listId')

	if (accessListOnly) {
		await knex('lists')
			.where('id', listId)
			.update({ last_accessed: knex.raw('NOW()') })
	} else {
		await knex('lists')
			.where('id', listId)
			.update({
				title,
				last_modified: knex.raw('NOW()'),
				last_accessed: knex.raw('NOW()'),
			})
	}

	const postedList = await knex('lists').where('id', listId)
	if (!postedList.length) throw new Error('Invalid parameter: listId')
	return postedList[0]
}
