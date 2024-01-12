const router = require('express').Router()
const controller = require('../controllers/lists.controller')

router.get('/', controller.list)

exports = router