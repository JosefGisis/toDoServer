require('dotenv').config()
//const config = require('config')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USER,  // config.get('user')
        password: process.env.DB_PASSWORD,  // config.get('password')
        database: process.env.DB_NAME  // config.get('database')
    }
})

module.exports = knex