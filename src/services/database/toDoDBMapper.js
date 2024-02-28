/**
 * Maps to-do object to database fields
 * @param {ToDo} toDo ToDo record to create
 */
module.exports.mapToDoToDB = function (toDo) {
	const { title, dueDate, membership, userId, completed } = toDo
	const dbToDo = {}
	if (title) dbToDo.title = title
	if (userId) dbToDo.user_id = userId
	if (dueDate || dueDate === null) dbToDo.due_date = dueDate
	if (membership || membership === null) dbToDo.membership = membership
	if (completed || completed === null) dbToDo.completed = completed
	return dbToDo
}

/**
 * Maps list from database for api
 * @param {ToDo} toDo ToDo record to map
 */
module.exports.mapToDoFromDB = function (toDo) {
	const { id, title, completed, creation_date: creationDate, last_modified: lastModified, user_id: userId, due_date: dueDate, membership } = toDo
	return { id, title, completed, membership, userId, creationDate, dueDate, lastModified }
}
