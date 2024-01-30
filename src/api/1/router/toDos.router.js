const router = require('express').Router()
const controller = require('../controllers/toDos.controller')

router.get('/', controller.toDos)

router.get('/:toDoId', controller.toDo)

router.post('/', controller.postToDo)

router.delete('/:toDoId', controller.deleteToDo)

router.delete('/', controller.deleteToDos)

router.put('/:toDoId', controller.putToDo)

module.exports = router