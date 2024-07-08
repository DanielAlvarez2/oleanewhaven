const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Wine = require('../models/Wine')
const MenuItem = require('../models/MenuItem')

module.exports={
    getDinner: async (req,res)=>{
        const charcuterie = await MenuItem.find({section:'charcuterie'}).sort({sequence:'asc'})
        const appetizers = await MenuItem.find({
            $and:[
                {menu:'dinner'},
                {section:'appetizers'}
            ]
        }).sort({sequence:'asc'})
        const entrees = await MenuItem.find({
            $and:[
                {menu:'dinner'},
                {section:'entrees'}
            ]
        }).sort({sequence:'asc'})
        const sides = await MenuItem.find({section:'sides'}).sort({sequence:'asc'})
        res.render('editDinner.ejs',{req:req,
                                     charcuterie:charcuterie,
                                     appetizers:appetizers,
                                     entrees:entrees,
                                     sides:sides,
                                     title:'EDIT DINNER MENU'})
    },
    updateItem: async (req,res)=>{
        try{
            const item = await MenuItem.findById(req.params.id)
            res.render('updateItem.ejs',{req:req,
                                         item:item,
                                         title:'UPDATE ITEM'
            })
        }catch(err){
            console.log(err)
        }
    },
    saveChanges: async(req,res)=>{
        try{
            console.log(req.params.id)
            console.log(req.body)
            await MenuItem.findByIdAndUpdate(req.params.id,req.body)
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    saveChangesWpic: async(req,res)=>{
        try{
            console.log(req.params.id)
            console.log(req.body)

            const result = await cloudinary.uploader.upload(req.file.path)

            await MenuItem.findByIdAndUpdate(req.params.id,{
                name:req.body.name,
                description:req.body.description,
                price:req.body.price,
                allergies:req.body.alergies,
                sequence:req.body.sequence,
                image:result.secure_url,
                cloudinaryId:result.public_id
            })
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    createMenuItem: (req,res)=>{
        try{
            res.render('createMenuItem.ejs',{title:'CREATE MENU ITEM',
                                             req:req,
                                             user:req.user})
        }catch(err){
            console.log(err)
        }
    },
    deleteMenuItem: async (req,res)=>{
        try{
            let menuItem = await MenuItem.findById({_id:req.params.id})
            if(menuItem.cloudinaryId) await cloudinary.uploader.destroy(menuItem.cloudinaryId)
            await MenuItem.deleteOne({_id:req.params.id})
            console.log('Deleted Post')
            res.redirect(req.get('referer'))            
        }catch(err){
            console.log(err)
        }
    }
}