const express = require('express')
const router = express.Router()
const test = require('../middleware/practice.js')

router.use(test)

const knex = require('./knexConnection')
router.get('/', async (req, res) => {
    try {
        const values = await knex.select().from('lists')
        res.send(values)
    } catch(err) {
        console.error('error fetching lists', err)
        res.status(500).send('internal server error')
    }
})

router.get('/active', async (req, res) => {
    try {
        const value = await knex('lists').where('active', 1).select()
        res.send(value)
    } catch (err) {
        console.error('error getting active list', err)
        res.status(500).send('internal server error')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const value = await knex('lists').where('id', req.params.id).select()
        res.send(value)
    } catch(err) {
        console.error('error fetching list', err)
        res.status(500).send('internal server error')
    }
})

router.post('/', async (req, res) => {
    try {
        await knex('lists').insert( req.body )
        await knex('lists').whereNot('title', req.body.title).update('active', 0)
        await knex('lists').where('title', req.body.title).update('active', 1)
        res.send(`inserted ${ req.body.title }`)
    } catch(err) {
        console.log(req.body.title)
        console.error('error posting new list', err)
        res.status(500).send('internal server error')
    }
})

router.put('/:id', async (req, res) => {
    try {
        await knex('lists').where('active', 1).update('active', 0)
        await knex('lists').where('id', req.params.id).update('active', 1)
        res.send(`updated list number ${req.params.id}`)
    } catch (err) {
        console.error('error updating active list', err)
        res.status(500).send('internal server error')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await knex('lists').where('id', req.params.id).del()
        res.send(`deleted ${ req.body }`)
    } catch(err) {
        console.error('error deleting list', err)
        res.status(500).send('internal server error')
    }
})

module.exports = router