/**
 * Create a todo
 * @param {ToDo} toDo ToDo record to create
 */

module.exports.mapToDoToDB = function (toDo) {
	const { title, dueDate, listId, userId, completed } = toDo

	const dbToDo = {}
	if (title) dbToDo.title = title
	if (userId) dbToDo.user_id = userId
	dbToDo.due_date = dueDate || null
	dbToDo.membership = listId || null
    dbToDo.completed = completed || 0

	return dbToDo
}
