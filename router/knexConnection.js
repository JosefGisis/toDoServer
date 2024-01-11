require('dotenv').config()
const config = require('config')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: config.get('user'),
        password: config.get('password'),
        database: config.get('database')
    }
})

module.exports = knex