import express from 'express'
import { authController as controller } from '../controllers'

import type { Router } from 'express'

const router: Router = express.Router()

router.post('/login', controller.login)

// sign in
router.post('/register', controller.register)

export default router 
