const router = require('express').Router()
const controller = require('../controllers/lists.controller')
// not to be confused with ./toDos.router.js which directly accesses to-dos and cannot retrieve to-dos associated with a particular list
const toDosRouter = require('./listToDos.router.js')

// toDosRouter accesses to-dos through listId (e.g. /lists/2/to-dos returns list 2's to-dos)
router.use('/:listId/to-dos', toDosRouter)

router.get('/', controller.lists)

router.get('/:listId', controller.list)

router.post('/', controller.postList)

router.delete('/:listId', controller.deleteList)

router.put('/:listId', controller.putList)

module.exports = router