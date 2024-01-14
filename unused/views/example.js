const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.get('/', async (req, res) => {
    try {
        res.render('index', {title: 'hello there', message: 'hello there'})
    } catch (err) {
        console.error('error getting active list', err)
        res.status(500).send('internal server error')
    }
})