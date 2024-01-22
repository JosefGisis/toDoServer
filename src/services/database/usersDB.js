const knex = require('./knexConnection')

module.exports.getUser = async function ({ userId, username }) {
	if (!userId && !username) throw new Error('missing parameters: userId and/or username')
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
    if (user[0]) return false
}

module.exports.emailAvailable = async function ({ email }) {
    if (!email) throw new Error('missing parameters: email')
    const user = await knex('users').where('email', email)
    if (user[0]) return false
}

module.exports.postUser = async function ({ username, email, password }) {
	if (!username || !email || !password) throw new Error('missing parameters: username/email/password')
	const postedId = await knex('users').insert({ username: username, email: email, pass_word: password })
	return postedId[0]
}
