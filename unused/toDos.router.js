const router = require('express').Router()
const controller = require('../src/api/1/controllers/toDos.controller')

router.get('/', controller.toDos)

router.get('/:toDoId', controller.toDo)

router.post('/', controller.postToDo)

router.delete('/:toDoId', controller.deleteToDo)

router.delete('/', controller.deleteToDos)

router.put('/:toDoId', controller.putToDo)

router.put('/:toDoId/toggle', controller.toggleToDo)

module.exports = router