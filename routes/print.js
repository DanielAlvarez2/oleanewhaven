const express = require('express')
const router = express.Router()
const printController = require('../controllers/print')

router.get('/dinner', printController.getDinner)

module.exports = router