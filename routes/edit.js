const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const editController = require('../controllers/edit')
const {ensureAuth} = require('../middleware/auth')

router.get('/archives', ensureAuth, editController.getArchives)
router.get('/dinner', editController.getDinner)
router.get('/charcuterie', ensureAuth, editController.getCharcuterie)
router.get('/appetizers', ensureAuth, editController.getAppetizers)
router.get('/entrees', ensureAuth, editController.getEntrees)
router.get('/sides', ensureAuth, editController.getSides)
router.get('/specials', ensureAuth,editController.getSpecials)
router.get('/dessert', ensureAuth, editController.getDessert)
router.get('/wine', editController.getWine)
router.get('/drinks', ensureAuth, editController.getDrinks)
router.get('/craftDrinks', ensureAuth, editController.getCraftDrinks)
router.get('/sangria', ensureAuth, editController.getSangria)
router.get('/nonAlcoholic', ensureAuth, editController.getNonAlcoholic)
router.get('/beer', ensureAuth, editController.getBeer)
router.get('/btg', ensureAuth, editController.getBTG)
router.get('/cavaChampagne', ensureAuth, editController.getCavaChampagne)
router.get('/rose', ensureAuth, editController.getRose)
router.get('/whiteSpain', ensureAuth, editController.getWhiteSpain)
router.get('/whiteFrance', ensureAuth, editController.getWhiteFrance)
router.get('/whiteItaly', ensureAuth, editController.getWhiteItaly)
router.get('/whiteGermany', ensureAuth, editController.getWhiteGermany)
router.get('/redSpain', ensureAuth, editController.getRedSpain)
router.get('/redFrance', ensureAuth, editController.getRedFrance)
router.get('/redItaly', ensureAuth, editController.getRedItaly)

router.get('/createMenuItem', ensureAuth, editController.createMenuItem)
router.get('/updateItem/:id', editController.updateItem)
router.post('/updateItem2', editController.updateItem2)
router.put('/saveChanges/:id', editController.saveChanges)
router.put('/saveChangesWpic/:id', upload.single('file'), editController.saveChangesWpic)
router.delete('/deleteMenuItem/:id', editController.deleteMenuItem)
router.get('/moveUp/:id', editController.moveUp)
router.get('/moveDown/:id', editController.moveDown)
router.put('/archiveMenuItem/:id', editController.archiveMenuItem)
router.put('/unarchiveMenuItem/:id', editController.unarchiveItem)
module.exports = router