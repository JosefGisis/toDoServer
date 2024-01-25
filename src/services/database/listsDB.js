const knex = require('./knexConnection')

/** 
 * @param {Object} params
 * @param {number} params.userId
 * @param {('id'|'title'|'last_updated'|'creation_date')} [params.sortBy='title']
 * @param {('asc'|'desc')} [params.order='asc']
 */
module.exports.getLists = async function ({ userId, sortBy = 'id', order = 'asc' }) {
	if (!userId) throw new Error('missing parameter: userId')
	if (['id', 'title', 'last_modified', 'creation_date', 'last_accessed'].includes(sortBy) && ['asc', 'desc'].includes(order)) {
		return await knex('lists').where('users_id', userId).orderBy(sortBy, order)
	} else {
		throw new Error('invalid sorting argument ')
	}
}

module.exports.getList = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	const list = await knex('lists').where('id', listId)
	return list[0]
}

module.exports.postList = async function ({ userId, title }) {
	if (!userId || !title) throw new Error('missing parameter: userId or title')
	const postedId = await knex('lists').insert({
		users_id: userId,
		title: title,
	})
	const newList = await knex('lists').where('id', postedId[0])
	return newList[0]
}

module.exports.deleteList = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('lists').where('id', listId).del()
}

module.exports.putList = async function ({ listId, title, accessListOnly }) {
	if (!listId || !title) throw new Error('missing parameter: listId or title')
	
	if (accessListOnly) {
		await knex('lists').where('id', listId).update({last_accessed: knex.raw('NOW()')})
	} else {
		await knex('lists')
			.where('id', listId)
			.update({
				title,
				last_modified: knex.raw('NOW()'),
				last_accessed: knex.raw('NOW()')
			}	
		)
	}

	const postedList = await knex('lists').where('id', listId)
	return postedList[0]
}
