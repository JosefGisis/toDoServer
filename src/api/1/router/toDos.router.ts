import express from 'express'
import { toDosController as controller } from '../controllers'

import type { Router } from 'express'

const router: Router = express.Router()

// gets all user's to-dos
router.get('/', controller.toDos)

// gets all to-dos associated with particular list
router.get('/by-list', controller.toDosByList)

// gets a particular to-do
router.get('/:toDoId', controller.toDo)

router.post('/', controller.createToDo)

// deletes all to-dos associated with a list
router.delete('/by-list', controller.deleteToDosByList)

// deletes a particular to-do
router.delete('/:toDoId', controller.deleteToDo)

router.put('/:toDoId', controller.updateToDo)

export default router
