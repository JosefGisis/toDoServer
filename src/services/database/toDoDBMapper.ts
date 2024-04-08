// These types need to be updated
export type ToDBToDo = {
	title: string | null | undefined
	dueDate: string | null | undefined
	membership: number | null | undefined 
	userId: number | null | undefined
	completed: boolean | null | undefined
}

export type ToDBToDoOutput = { 
	id?:number
	title?: string
	user_id?: number,
	due_date?: string | null,
	membership?: number | null,
	completed?: 0 | 1,
}

// takes request object parameters and formats them for use with knex
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

// DBToDo ToDo received from database
export type DBToDo = {
	id: number,
	title: string,
	completed: 0 | 1, 
	creation_date: string,
	last_modified: string, 
	user_id: number | null,
	due_date: string | null,
	membership: number | null
}

// ClientToDo changes to camel case for client
export type ClientToDo = {
	id: number,
	title: string,
	completed: boolean, 
	creationDate: string,
	lastModified: string, 
	userId: number | null,
	dueDate: string | null,
	membership: number | null
}

// takes to-do from database and formats it for use with client
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
