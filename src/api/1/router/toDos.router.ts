import express, { Router } from 'express'
import { toDosController as controller } from '../controllers'

const router: Router = express.Router()

router.get('/', controller.toDos)

router.get('/by-list', controller.toDosByList)

router.get('/:toDoId', controller.toDo)

router.post('/', controller.createToDo)

router.delete('/by-list', controller.deleteToDosByList)

router.delete('/:toDoId', controller.deleteToDo)

router.put('/:toDoId', controller.updateToDo)

export default router
