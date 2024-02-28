/**
 * Maps list object to database fields
 * @param {List} list list record to create
 */
module.exports.mapListToDB = function (list) {
	const { title, userId } = list
	const dbList = {}
	if (title) dbList.title = title
	if (userId) dbList.user_id = userId
	return dbList
}

/**
 * Maps list object from database fields for api
 * @param {List} list
 */
module.exports.mapListFromDB = function (list) {
	const { id, title, user_id: userId, creation_date: creationDate, last_accessed: lastAccessed, last_modified: lastModified } = list
	return { id, title, userId, creationDate, lastAccessed, lastModified }
}
