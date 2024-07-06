const cloudinary = require('../middleware/cloudinary')
const menuItem = require('../models/MenuItem')

module.exports = {
    create: async(req,res)=>{
        console.log(req.body)
    }
}