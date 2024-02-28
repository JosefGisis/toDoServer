const knex = require('./knexConnection')
const { mapUserFromDB } = require('./userDBMapper')

// Gets user. Takes either a userId or username argument for user retrieval
module.exports.getUser = async function ({ userId, username }) {
	if (!userId && !username) throw new Error('missing parameters: userId and/or username')
	if (userId) {
		const user = await knex('users').where('id', userId)
		return mapUserFromDB(user[0])
	}
	if (username) {
		const user = await knex('users').where('username', username)
		return mapUserFromDB(user[0])
	}
}

// Used by api to check if username is taken
module.exports.usernameAvailable = async function ({ username }) {
	if (!username) throw new Error('missing parameters: username')
	const user = await knex('users').where('username', username)
	return user[0] ? false : true
}

// Checks if email is already associated with an account
module.exports.emailAvailable = async function ({ email }) {
	if (!email) throw new Error('missing parameters: email')
	const user = await knex('users').where('email', email)
	return user[0] ? false : true
}

module.exports.createUser = async function ({ username, email, password }) {
	if (!username || !email || !password) throw new Error('missing parameters: username/email/password')
	const postedId = await knex('users').insert({ username, email, password })
	const newUser = await knex('users').where('id', postedId[0])
	return mapUserFromDB(newUser[0])
}
