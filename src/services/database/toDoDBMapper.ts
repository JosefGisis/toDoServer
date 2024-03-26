export const mapToDoToDB = (toDo: ToDo) => {
	const { title, dueDate, membership, userId, completed } = toDo
	const dbToDo = {}
	/**
	 * Mapper cannot pass an empty property as it clears db record values.
	 * Mapper checks if valid arguments are present before adding to dbToDo object.
	 * Any above variables left out are kept as is and not updated.
	 */
	if (title) dbToDo.title = title
	if (userId) dbToDo.user_id = userId
	// Client passes null to two following expressions to remove dueDate or membership
	if (dueDate || dueDate === null) dbToDo.due_date = dueDate
	if (membership || membership === null) dbToDo.membership = membership
	// Requires a strict true or false value.
	if (completed === true) dbToDo.completed = 1
	if (completed === false) dbToDo.completed = 0
	// Alternative method for checking completed status. Checks for truthy or falsy
	// if (completed !== null || completed !== undefined) dbToDo.completed = completed
	return dbToDo
}

export const mapToDoFromDB = (toDo: ToDo) => {
	const {
		id,
		title,
		completed: completedBinary,
		creation_date: creationDate,
		last_modified: lastModified,
		user_id: userId,
		due_date: dueDate,
		membership,
	} = toDo

	// db deals in binary boolean values. For consistency mapper converts to true/false
	const completed = completedBinary === 0 ? false : true
	return { id, title, completed, membership, userId, creationDate, dueDate, lastModified }
}
