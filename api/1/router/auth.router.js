const router = require('express').Router()
const controller = require('../controllers/auth.controller')

router.post('/login', controller.login)

router.post('/register', controller.register)

exports = router
