const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const editController = require('../controllers/edit')
const {ensureAuth} = require('../middleware/auth')

router.get('/dinner', editController.getDinner)
router.get('/createMenuItem', editController.createMenuItem)
router.get('/updateItem/:id', editController.updateItem)
router.put('/saveChanges/:id', editController.saveChanges)
router.delete('/deleteMenuItem/:id', editController.deleteMenuItem)

module.exports = router