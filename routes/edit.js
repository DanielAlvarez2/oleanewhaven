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
router.get('/charcuterie', editController.getCharcuterie)
router.get('/appetizers', editController.getAppetizers)
router.get('/entrees', editController.getEntrees)
router.get('/sides', editController.getSides)
router.get('/specials', editController.getSpecials)
router.get('/dessert', editController.getDessert)
router.get('/wine', editController.getWine)
router.get('/drinks', editController.getDrinks)
router.get('/craftDrinks', editController.getCraftDrinks)
router.get('/sangria', editController.getSangria)
router.get('/nonAlcoholic', editController.getNonAlcoholic)
router.get('/beer', editController.getBeer)
router.get('/btg', editController.getBTG)
router.get('/cavaChampagne', editController.getCavaChampagne)
router.get('/rose', editController.getRose)
router.get('/whiteSpain', editController.getWhiteSpain)
router.get('/whiteFrance', editController.getWhiteFrance)
router.get('/whiteItaly', editController.getWhiteItaly)
router.get('/whiteGermany', editController.getWhiteGermany)
router.get('/redSpain', editController.getRedSpain)
router.get('/redFrance', editController.getRedFrance)
router.get('/redItaly', editController.getRedItaly)

router.get('/createMenuItem', editController.createMenuItem)
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