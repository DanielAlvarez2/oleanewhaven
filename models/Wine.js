const mongoose = require('mongoose')

const WineSchema = new mongoose.Schema({
    menu:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true,
    },
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
    },
    sequence:{
        type:String,
        required:true,
    }
    })

    module.exports = mongoose.model('Wine',WineSchema)