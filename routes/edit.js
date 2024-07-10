const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const editController = require('../controllers/edit')
const {ensureAuth} = require('../middleware/auth')

router.get('/archives', editController.getArchives)
router.get('/dinner', editController.getDinner)
router.get('/specials', editController.getSpecials)
router.get('/dessert', editController.getDessert)
router.get('/wine', editController.getWine)
router.get('/drinks', editController.getDrinks)
router.get('/createMenuItem', editController.createMenuItem)
router.get('/updateItem/:id', editController.updateItem)
router.put('/saveChanges/:id', editController.saveChanges)
router.put('/saveChangesWpic/:id', upload.single('file'), editController.saveChangesWpic)
router.delete('/deleteMenuItem/:id', editController.deleteMenuItem)
router.get('/moveUp/:id', editController.moveUp)
router.get('/moveDown/:id', editController.moveDown)
router.put('/archiveMenuItem/:id', editController.archiveMenuItem)
router.put('/unarchiveMenuItem/:id', editController.unarchiveItem)
module.exports = router