const mongoose = require('mongoose')

const WineSchema = new mongoose.Schema({
    grapes:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    vintage:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    }
    })

    module.exports = mongoose.model('Wine',WineSchema)