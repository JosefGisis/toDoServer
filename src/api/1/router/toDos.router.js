const router = require('express').Router({ mergeParams: true })
const controller = require('../controllers/toDos.controller')

// returns all to-dos associated with active list
router.get('/', controller.toDos)

router.get('/:toDoId', controller.toDo)

// posts to-do with membership in active list
router.post('/', controller.postToDo)

router.delete('/:toDoId', controller.deleteToDo)

// deletes all to-dos within active list
router.delete('/', controller.deleteToDos)

router.put('/:toDoId', controller.putToDo)

router.put('/:toDoId/toggle', controller.toggleToDo)

module.exports = router 