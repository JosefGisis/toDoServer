const router = require('express').Router()
const controller = require('../controllers/profile.controller.js')

router.get('/:userId', controller.profile)

router.put('/:userId', controller.putProfile)

exports = router