const router = require('express').Router()

const authRouter = require('./auth.router.js')
const listsRouter = require('./lists.router.js')
const toDosRouter = require('./toDos.router.js')
const profileRouter = require('./profile.router.js')

const {authenticate} = require('../middleware/auth.js')

router.use('/auth', authRouter)

router.use('/lists', authenticate, listsRouter)

router.use('/to-dos', authenticate, toDosRouter)

router.use('/profile', authenticate, profileRouter)

module.exports = router
