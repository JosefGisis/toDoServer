import knex from './knexConnection'
import { mapUserFromDB } from './userDBMapper'
import type { DBUser } from './userDBMapper'

// Gets user. Takes either a userId or username argument for user retrieval
export const getUser = async (userId: number | null, username?: string) => {
	if (!userId && !username) throw new Error('missing parameters: userId and/or username')

	if (userId) {
		const users: DBUser[] = await knex('users').where('id', userId)
		if (!users.length) throw new Error('Error getting user info. Check user id')
		return mapUserFromDB(users[0])
	}

	const users: DBUser[] = await knex('users').where('username', username)
	if (!users.length) throw new Error('Error getting user info. Check username')
	return mapUserFromDB(users[0])
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

	const postedIds: number[] = await knex('users').insert({ username, email, password })
	if (!postedIds.length) throw new Error('Error creating use')

	const newUsers: DBUser[] = await knex('users').where('id', postedIds[0])
	if (!newUsers.length) throw new Error('Error creating/getting user')
	return mapUserFromDB(newUsers[0])
}
