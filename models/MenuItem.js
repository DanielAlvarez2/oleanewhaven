const mongoose = require('mongoose')

const MenuItemSchema = new mongoose.Schema({
    menu:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    allergies:{
        type:String,
    },
    sequence:{
        type:Number,
        required:true
    },
    vintage:{
        type:String
    },
    grapes:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    archived:{
        type:Boolean,
        default:false
    },
    image:{
        type:String
    },
    cloudinaryId:{
        type:String
    },
    lastModified:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('MenuItem', MenuItemSchema)