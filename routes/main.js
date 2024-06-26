const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const {ensureAuth, ensureGuest} = require('../middleware/auth')


router.get('/',homeController.getIndex)
router.get('/specials',homeController.getSpecials)
router.get('/dessert',homeController.getDesserts)
router.get('/wine',homeController.getWine)
router.get('/drinks',homeController.getDrinks)
router.get('/profile',ensureAuth,postsController.getProfile)
router.get('/feed',ensureAuth,postsController.getFeed)
router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)
router.get('/logout',authController.logout)
router.get('/signup',authController.getSignup)
router.post('/signup',authController.postSignup)

module.exports = router