const router = require('express').Router()
const controller = require('../controllers/toDos.controller')

// returns all user's to-dos
router.get('/', controller.toDos)

router.get('/:toDoId', controller.toDo)

router.delete('/:toDoId', controller.deleteToDo)

// router.post('/', controller.postToDo)
// router.delete('/', controller.deleteToDos)
// router.put('/:toDoId', controller.putToDo)

module.exports = router