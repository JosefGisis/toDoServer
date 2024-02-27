const knex = require('./knexConnection')

module.exports.getUser = async function ({ userId, username }) {
	if (!userId && !username) throw new Error('missing parameters: userId and/or username')
	console.log('userId is ' + userId)
	console.log('username is ' + username)
	if (userId) {
		const user = await knex('users').where('id', userId)
		return user[0]
	}
	if (username) {
		const user = await knex('users').where('username', username)
		return user[0]
	}
}

module.exports.usernameAvailable = async function ({ username }) {
	if (!username) throw new Error('missing parameters: username')
	const user = await knex('users').where('username', username)
	return user[0] ? false : true
}

module.exports.emailAvailable = async function ({ email }) {
	if (!email) throw new Error('missing parameters: email')
	const user = await knex('users').where('email', email)
	return user[0] ? false : true
}

module.exports.createUser = async function ({ username, email, password }) {
	if (!username || !email || !password) throw new Error('missing parameters: username/email/password')
	const postedId = await knex('users').insert({ username, email, password })
	const newUser = await knex('users').where('id', postedId[0])
	return newUser[0]
}
