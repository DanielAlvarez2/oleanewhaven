const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const editController = require('../controllers/edit')
const {ensureAuth} = require('../middleware/auth')

router.get('/dinner', editController.getDinner)
router.get('/specials', editController.getSpecials)
router.get('/createMenuItem', editController.createMenuItem)
router.get('/updateItem/:id', editController.updateItem)
router.put('/saveChanges/:id', editController.saveChanges)
router.put('/saveChangesWpic/:id', upload.single('file'), editController.saveChangesWpic)
router.delete('/deleteMenuItem/:id', editController.deleteMenuItem)

module.exports = router