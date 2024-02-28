/**
 * @param {User} user user record to map from database
 */
module.exports.mapUserFromDB = function (user) {
	const { id, username, email, password, creation_date: creationDate } = user
	return { id, username, email, password, creationDate }
}
