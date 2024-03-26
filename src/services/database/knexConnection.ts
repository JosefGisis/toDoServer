import dotenv from "dotenv"
dotenv.config()

import Knex from "knex"

export default Knex({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		port: 3306,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	},
})
