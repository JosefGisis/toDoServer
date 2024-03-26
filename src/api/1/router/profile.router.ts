import express, { Router } from 'express'
import { profileController as controller } from '../controllers'

const router: Router = express.Router()

router.get('/', controller.profile)

export default router
