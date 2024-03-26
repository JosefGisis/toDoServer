type ToDBList = {
	title: any,
	userId: any,
}

type ToDBListOutput = { 
	id?:number
	title?: string
	user_id?: number
}

function mapListToDB(list: ToDBList): ToDBListOutput {
	const { title, userId } = list
	const dbList: ToDBListOutput = {}

	if (title) dbList.title = title
	if (userId) dbList.user_id = userId

	return dbList
}

export type DBList = {
	id: number,
	title: string,
	user_id: number | null,
	creation_date: string | null,
	last_accessed: string | null, 
	last_modified: string | null, 
}

export type List = {
	id: number,
	title: string,
	userId: number | null,
	creationDate: string | null,
	lastAccessed: string | null, 
	lastModified: string | null, 
}


function mapListFromDB(list: DBList):List{
	const { id, title, user_id: userId, creation_date: creationDate, last_accessed: lastAccessed, last_modified: lastModified } = list
	return { id, title, userId, creationDate, lastAccessed, lastModified } 
}

export { mapListToDB, mapListFromDB }
