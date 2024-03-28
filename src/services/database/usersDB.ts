import knex from './knexConnection'
import { mapUserFromDB, DBUser } from './userDBMapper'

// Gets user. Takes either a userId or username argument for user retrieval
export const getUser = async (userId?: number, username?: string) => {
	if (!userId && !username) throw new Error('missing parameters: userId and/or username')
	if (userId) {
		const user: DBUser[] = await knex('users').where('id', userId)
		return user[0] ? mapUserFromDB(user[0]) : user[0]
	} else {
		const user: DBUser[] = await knex('users').where('username', username)
		return user[0] ? mapUserFromDB(user[0]) : user[0]
	}
}

// Used by api to check if username is taken
export const usernameAvailable = async (username: string) => {
	if (!username) throw new Error('missing parameters: username')
	const user: DBUser[] = await knex('users').where('username', username)
	return user[0] ? false : true
}

// Checks if email is already associated with an account
export const emailAvailable = async (email: string) => {
	if (!email) throw new Error('missing parameters: email')
	const user: DBUser[] = await knex('users').where('email', email)
	return user[0] ? false : true
}

export const createUser = async (username: string, email: string, password: string) => {
	if (!username || !email || !password) throw new Error('missing parameters: username/email/password')
	// what does postedId return
	const postedId = await knex('users').insert({ username, email, password })
	const newUser: DBUser[] = await knex('users').where('id', postedId[0])
	return newUser[0] ? mapUserFromDB(newUser[0]) : newUser[0]
}
