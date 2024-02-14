const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/listToDos.controller')

// returns all to-dos associated with list
router.get('/', controller.listToDos)

router.get('/:toDoId', controller.toDo)

router.post('/', controller.createToDo)

router.delete('/:toDoId', controller.deleteToDo)

router.delete('/', controller.deleteListToDos)

router.put('/:toDoId', controller.updateToDo)

module.exports = router 