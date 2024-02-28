const router = require('express').Router()
const controller = require('../controllers/lists.controller')
const listToDosRouter = require('./listToDos.router.js')

// nested to-dos (listToDos) router. See listToDos.router.js
router.use('/:listId/to-dos', listToDosRouter)

router.get('/', controller.lists)

router.get('/:listId', controller.list)

router.post('/', controller.createList)

router.delete('/:listId', controller.deleteList)

router.put('/:listId', controller.updateList)

module.exports = router
