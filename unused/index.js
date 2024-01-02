require('dotenv').config()

const Joi = require('joi')
//Joi not working. Look at docs

const express = require('express')
const app = express()
app.use(express.json())

const users = [
    {id: 1, userName: 'Yossi', email: 'gamil.com'},
    {id: 2, userName: 'Gisis', email: 'gmail.com'}, 
    {id: 3, userName: 'Chavi', email: 'gamil.com'}
]

app.get('/api/users', (req, res) => {
    res.send(users) 
})

app.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) {
        res.status(404).send('sorry, page not found')
        return
    }
    res.send(user)
})

app.post('/api/users', (req, res) => {
    if (!req.body.name || req.body.length < 3) {
        // install joi, input validation service
        // 400 bad request
        res.status(400).send('sorry. Invalid input')
    }
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email 
    }
    users.push(user)
    res.send(user)
})

app.put('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) res.status(404).send('sorry, page not found')

    if (!req.body.name || req.body.length < 3) {
        // install joi, input validation service
        // 400 bad request
        res.status(400).send('sorry. Invalid input')
        return
    }

    user.userName = req.body.name
    res.send(user.userName)
})

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if (!user) {
        res.status(404).send('sorry, page not found')
        return
    }

    const index = users.findIndex(user => user.id === parseInt(req.params.id))
    users.splice(index, 1)
    res.send(users)
})

const port = 3000
app.listen(port, () => console.log(`listening on port ${port}`))