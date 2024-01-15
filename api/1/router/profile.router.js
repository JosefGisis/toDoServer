const router = require('express').Router()
const controller = require('../controllers/profile.controller.js')

router.get('/', controller.profile)

module.exports = router