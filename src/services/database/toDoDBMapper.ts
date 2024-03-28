export type ToDBToDo = {
	title?: any,
	dueDate?: any,
	membership?: any,
	userId?: any,
	completed?: any
}

export type ToDBToDoOutput = { 
	id?:number
	title?: string
	user_id?: number,
	due_date?: string,
	membership?: number,
	completed?: 0 | 1,
	
}

export function mapToDoToDB(toDo: ToDBToDo): ToDBToDoOutput {
	const { title, dueDate, membership, userId, completed } = toDo
	const dbToDo: ToDBToDoOutput = {}
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

export type DBToDo = {
	id: number,
	title: string,
	completed: 0 | 1, 
	creation_date: string | null,
	last_modified: string | null, 
	user_id: number | null,
	due_date: string | null,
	membership: number | null
}

export type ClientToDo = {
	id: number,
	title: string,
	completed: boolean, 
	creationDate: string | null,
	lastModified: string | null, 
	userId: number | null,
	dueDate: string | null,
	membership: number | null
}

export function mapToDoFromDB(toDo: DBToDo): ClientToDo {
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
