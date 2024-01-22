const router = require('express').Router()

const authRouter = require('./auth.router.js')
const listsRouter = require('./lists.router.js')
const toDosRouter = require('./toDos.router.js')
const profileRouter = require('./profile.router.js')

const { authenticate } = require('../middleware/auth.js')

module.exports = (passport) => {
	router.use('/auth', authRouter)

	router.use('/lists', authenticate(passport), listsRouter)

	router.use('/to-dos', authenticate(passport), toDosRouter)

	router.use('/profile', authenticate(passport), profileRouter)

	return router
}
