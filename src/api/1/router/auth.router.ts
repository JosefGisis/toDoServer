import express, { Router } from 'express'
import { authController as controller } from '../controllers'

const router: Router = express.Router()

router.post('/login', controller.login)

// sign in
router.post('/register', controller.register)

export default router 
