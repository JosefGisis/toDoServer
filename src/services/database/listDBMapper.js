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
