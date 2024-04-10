import express from 'express'
import { profileController as controller } from '../controllers'

import type { Router } from 'express'

const router: Router = express.Router()

// gets a user's profile
router.get('/', controller.profile)

export default router
