const knex = require('./knexConnection')

module.exports.getLists = async function ({ userId }) {
	if (!userId) throw new Error('missing parameter: userId')
	return await knex('lists').where('users_id', userId)
}

module.exports.getList = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	const list = await knex('lists').where('id', listId)
	return list[0]
}

module.exports.postList = async function ({ userId, title }) {
	if (!userId || !title) throw new Error('missing parameter: listId or title')
	const postedId = await knex('lists').insert({ users_id: userId, title: title })
	return postedId[0]
}

module.exports.deleteList = async function ({ listId }) {
	if (!listId) throw new Error('missing parameter: listId')
	return await knex('lists').where('id', listId).del()
}

module.exports.putList = async function ({ listId, title }) {
	if (!listId || !title) throw new Error('missing parameter: listId or title')
	return await knex('lists').where('id', listId).update('title', title)
}
