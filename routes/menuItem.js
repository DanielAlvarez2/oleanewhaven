const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const menuItemController = require('../controllers/menuItem')
const {ensureAuth} = require('../middleware/auth')

router.post('/createWpic', upload.single('file'), menuItemController.createWpic)
router.post('/createNOpic', menuItemController.createNOpic)

module.exports = router