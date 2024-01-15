const router = require('express').Router()
const controller = require('../controllers/lists.controller')

const toDosRouter = require('./toDos.router')

router.use('/:listId/to-dos', toDosRouter)

router.get('/', controller.lists)

router.get('/:listId', controller.list)

router.post('/', controller.postList)

router.delete('/:listId', controller.deleteList)

router.put('/:listId', controller.putList)

module.exports = router