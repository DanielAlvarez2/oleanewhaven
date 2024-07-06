const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const menuItemController = require('../controllers/menuItem')
const {ensureAuth} = require('../middleware/auth')

router.post('/create', upload.single('file'), menuItemController.create)

module.exports = router