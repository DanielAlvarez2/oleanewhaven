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
    getSpecials: async (req,res)=>{
        const appetizers = await MenuItem.find({
            $and:[
                {menu:'specials'},
                {section:'appetizers'}
            ]
        }).sort({sequence:'asc'})
        const entrees = await MenuItem.find({
            $and:[
                {menu:'specials'},
                {section:'entrees'}
            ]
        }).sort({sequence:'asc'})
        const desserts = await MenuItem.find({
            $and:[
                {menu:'specials'},
                {section:'desserts'}
            ]
        }).sort({sequence:'asc'})
        res.render('editSpecials.ejs',{title:'EDIT SPECIALS',
                                       req:req,
                                       appetizers:appetizers,
                                       entrees:entrees,
                                       desserts:desserts})
    },
    getDessert: async(req,res)=>{
        const desserts = await MenuItem.find({
            $and:[
                {menu:'dessert'},
                {section:'desserts'}
            ]
        }).sort({sequence:'asc'})
        res.render('editDessert.ejs',{req:req,
                                      title:'EDIT DESSERTS',
                                      desserts:desserts})
        
    },
    getWine: async(req,res)=>{
        const btgCava = await MenuItem.find({section:'btg cava'}).sort({sequence:'asc'})
        const btgWhites = await MenuItem.find({section:'btg whites'}).sort({sequence:'asc'})
        const btgRose = await MenuItem.find({section:'btg rose'}).sort({sequence:'asc'})
        const btgReds = await MenuItem.find({section:'btg reds'}).sort({sequence:'asc'})
        const btgSherries = await MenuItem.find({section:'btg sherries'}).sort({sequence:'asc'})
        res.render('editWine.ejs',{title:'EDIT WINE',
                                   req,req,
                                   btgCava:btgCava,
                                   btgWhites:btgWhites,
                                   btgRose:btgRose,
                                   btgReds:btgReds,
                                   btgSherries:btgSherries})
    },
    getDrinks: async(req,res)=>{
        const craftDrinks = await MenuItem.find({section:'craft drinks'}).sort({sequence:'asc'})
        const sangria = await MenuItem.find({section:'sangria'}).sort({sequence:'asc'})
        const nonAlcoholic = await MenuItem.find({section:'non-alcoholic'}).sort({sequence:'asc'})
        const beerCans = await MenuItem.find({section:'beer can'}).sort({sequence:'asc'})
        const beerDrafts = await MenuItem.find({section:'beer draft'}).sort({sequence:'asc'})
        res.render('editDrinks.ejs',{title:'EDIT DRINKS',
                                     req:req,
                                     craftDrinks:craftDrinks,
                                     sangria:sangria,
                                     nonAlcoholic:nonAlcoholic,
                                     beerCans:beerCans,
                                     beerDrafts:beerDrafts})
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
            console.log('cloudinaryId: '+req.body.cloudinaryId)
            if(req.body.cloudinaryId){
                await cloudinary.uploader.destroy(req.body.cloudinaryId)
            }
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