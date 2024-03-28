export type ToDBList = {
	title: string | null | undefined
	userId: number | null | undefined
}

export type ToDBListOutput = {
	title?: string
	user_id?: number
}

// takes request object parameters and formats them for use with knex
export function mapListToDB(list: ToDBList): ToDBListOutput {
	const { title, userId } = list
	const dbList: ToDBListOutput = {}

	if (title) dbList.title = title
	if (userId) dbList.user_id = userId

	return dbList
}

// DBList list received from database
export type DBList = {
	id: number
	title: string
	user_id: number
	creation_date: string
	last_accessed: string
	last_modified: string
}

// ClientList changes to camel case for client
export type ClientList = {
	id: number
	title: string
	userId: number
	creationDate: string
	lastAccessed: string
	lastModified: string
}

// takes list from database and formats it for use with client
export function mapListFromDB(list: DBList): ClientList {
	const { id, title, user_id: userId, creation_date: creationDate, last_accessed: lastAccessed, last_modified: lastModified } = list
	return { id, title, userId, creationDate, lastAccessed, lastModified }
}
