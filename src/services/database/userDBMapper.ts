/**
 * Maps user object from database for api
 * @param {User} user user record to map from database
 */

export const mapUserFromDB = (user: User) => {
	const { id, username, email, password, creation_date: creationDate } = user
	return { id, username, email, password, creationDate }
}
