const knex = require('../../../knexConnection.js')

const bcrypt = require('bcrypt')
const saltRounds = 10

exports.profile = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
		} = req

		const lists = await knex('lists').where('id', users_Id)
		
        res.send({ data: lists })
	} catch (err) {
		console.error(err)
		res.status(500).json('error performing request. Please try again soon')
	}
}

exports.putProfile = async function (req, res) {
	try {
		const {
			authInfo: { users_Id },
			params: { id },
			body: { username, email, password },
		} = req

        
        const usernameTaken = await knex('users').where('username', username)
        if(usernameTaken.length) return res.status(400).json({message:'username already exists'})
        
        const emailTaken = await knex('users').where('email', email)
        if(emailTaken.length) return res.status(400).json({message:'email already exists'})

        const hashedPassword = await bcrypt.hashSync(password, saltRounds)
        
		const putList = await knex('lists').where('users_Id', users_Id).andWhere('membership', id).update('title', title)

		res.send({ data: putList })
	} catch (err) {
		console.error(err)
		res.status(500).send('internal server error')
	}
}