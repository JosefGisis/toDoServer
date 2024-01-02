const express = require('express')
const router = express.Router()

const knex = require('./knexConnection')

router.get('/', async (req, res) => {
    try {
        const values = await knex.select().from('to_dos')
        res.send(values)
    } catch(err) {
        console.error('error fetching to-dos', err)
        res.status(500).send('internal server error')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const value = await knex('to_dos').where('id', req.params.id).select()
        res.send(value)
    } catch(err) {
        console.error('Error fetching request', err)
        res.status(500).send('internal server error')
    }
})

router.get('/current/:id', async (req, res) => {
    try {
        const value = await knex('to_dos').where('membership', req.params.id).select()
        res.send(value)
    } catch (err) {
        console.error('error fetching request', err)
        res.status(500).send('internal server error')
    }
})

router.post('/', async (req, res) => {
    try {
        await knex('to_dos').insert( req.body )
        res.send(`inserted new to-do as ${req.body.title}`)
    } catch(err) {
        console.error('error posting new to-do', err)
        res.status(500).send('internal server error')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await knex('to_dos').where('id', req.params.id).del()
        res.send(`deleted ${ req.body }`)
    } catch(err) {
        console.error('error deleting list', err)
        res.status(500).send('internal server error')
    }
})

module.exports = router