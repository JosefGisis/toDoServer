export type DBUser = {
	id: number
	username: string
	email: string
	password: string
	creation_date: string | null
}

export type ClientUser = {
	id: number
	username: string
	email: string
	password: string
	creationDate: string | null
}

export const mapUserFromDB = (user: DBUser): ClientUser => {
	const { id, username, email, password, creation_date: creationDate } = user
	return { id, username, email, password, creationDate }
}
