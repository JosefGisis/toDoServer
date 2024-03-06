const router = require('express').Router()
const controller = require('../controllers/toDos.controller')

router.get('/', controller.toDos)

router.get('/by-list', controller.toDosByList)

router.get('/:toDoId', controller.toDo)

router.post('/', controller.createToDo)

router.delete('/:toDoId', controller.deleteToDo)

router.delete('/by-list', controller.deleteToDosByList)

router.put('/:toDoId', controller.updateToDo)

module.exports = router
