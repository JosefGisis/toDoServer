const express = require('express')
const router = express.Router()

const knex = require('./knexConnection')

router.get('/', async (req, res) => {
    try {
        const values = await knex.select().from('users') 
        res.send(values)
    } catch(err) {
        console.error('error fetching users', err)
        res.status(500).send('internal server error')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const value = await knex('users').where('id', req.params.id).select()
        res.send(value)
    } catch(err) {
        console.error('error fetching user', err)
        res.status(500).send('internal server error')
    }
})

router.post('/', async (req, res) => {
    try {
        await knex('users').insert( req.body )
        res.send(`inserted ${ req.body }`)
    } catch(err) {
        console.error('error posting new user', err)
        res.status(500).send('internal server error')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await knex('users').where('id', req.params.id).del()
        res.send(`deleted ${ req.body }`)
    } catch(err) {
        console.error('error deleting user', err)
        res.status(500).send('internal server error')
    }
})

module.exports = router