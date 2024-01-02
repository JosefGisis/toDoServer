require('dotenv').config()
const express = require('express')

const app = express()
app.use(express.json())
const port = 5000

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'to_do_app'
})

connection.connect((err) => {
    if (err) {
        console.error(`error connecting ${err.stack}`)
        return
    }
    console.log(`connected as id ${connection.threadId}`)
})

connection.query('SELECT * FROM users', (error, results) => {
    if (error) {
        console.log('error getting request')
        return
    }
    console.log(results)
})

connection.query('SELECT * FROM to_dos ORDER BY completed ASC', (error, results) => {
    if (error) {
        console.log('error retrieving request')
        return
    }
    console.log(results)
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})