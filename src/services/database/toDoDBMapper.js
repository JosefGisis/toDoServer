/**
 * Create a todo
 * @param {ToDo} toDo ToDo record to create
 */
module.exports.mapToDoToDB = function (toDo) {
	const { title, dueDate, membership, userId, completed } = toDo

	const dbToDo = {}
	if (title) dbToDo.title = title
	if (userId) dbToDo.user_id = userId
	dbToDo.due_date = dueDate || null
	dbToDo.membership = membership || null
	dbToDo.completed = completed || 0

	return dbToDo
}

/**
 * Create a todo
 * @param {ToDo} toDo ToDo record to map
 */
module.exports.mapFromDoToDB = function (toDo) {
	const { title, dueDate, membership, userId, completed } = toDo

	const dbToDo = {}
	if (title) dbToDo.title = title
	if (userId) dbToDo.user_id = userId
	dbToDo.due_date = dueDate || null
	dbToDo.membership = membership || null
	dbToDo.completed = completed || 0

	return dbToDo
}
