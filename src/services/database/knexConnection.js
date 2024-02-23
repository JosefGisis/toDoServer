require('dotenv').config()
const config = require('config')

const db = config.get( process.env.NODE_ENV === 'production' ? 'db.prod' : 'db.dev')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: db.host, //process.env.LOCAL_HOST,
        port: db.port, //process.env.LOCAL_PORT,
        user: db.username, //process.env.LOCAL_USERNAME,
        password: db.password, //process.env.LOCAL_PASSWORD,
        database: db.database //process.env.LOCAL_DATABASE
    }
})

module.exports = knex