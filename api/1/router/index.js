const router = require('express').Router()
const authRouter = require('./auth.routes')
const listsRouter = require('./lists.routes')
const {authenticate} = require('../middleware/auth')

router.use('/auth', authRouter)

router.use('/lists', authenticate, listsRouter)

exports = router
