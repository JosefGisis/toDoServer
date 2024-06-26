import express from 'express'
import { listsController as controller } from '../controllers'

import type { Router } from 'express'

const router: Router = express.Router()

// get all user's lists
router.get('/', controller.lists)

// get a particular list
router.get('/:listId', controller.list)

router.post('/', controller.createList)

router.delete('/:listId', controller.deleteList)

router.put('/:listId', controller.updateList)

export default router
