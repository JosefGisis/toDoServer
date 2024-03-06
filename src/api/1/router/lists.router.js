const router = require('express').Router()
const controller = require('../controllers/lists.controller')

router.get('/', controller.lists)

router.get('/:listId', controller.list)

router.post('/', controller.createList)

router.delete('/:listId', controller.deleteList)

router.put('/:listId', controller.updateList)

module.exports = router
