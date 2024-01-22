const lists = require('./lists')
const database = require('./knexConnection')

const users = {
	async getUser({ id, username }) {
		if (!id && !username) throw new Error('Invalid or missing argument: requires valid id or username')
		let response
		if (id) {
			response = await database('users').where('id', id).limit(1)
		} else {
			response = await database('users').where('username', username).limit(1)
		}
		return response?.[0]
	},
}

module.exports = { lists, users }
