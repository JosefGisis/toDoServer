import express, { Router } from 'express'

import authRouter from './auth.router'
import listsRouter from './lists.router'
import toDosRouter from './toDos.router'
import profileRouter from './profile.router'

import { authenticate } from '../middleware/auth'

const router: Router = express.Router()

router.use('/auth', authRouter)

router.use('/lists', authenticate(), listsRouter)

router.use('/to-dos', authenticate(), toDosRouter)

router.use('/profile', authenticate(), profileRouter)

export default router
