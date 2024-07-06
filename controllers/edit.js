const Post = require('../models/Post')
const Wine = require('../models/Wine')
const MenuItem = require('../models/MenuItem')

module.exports={
    getDinner: async (req,res)=>{
        const charcuterie = await Post.find({section:'charcuterie'}).sort({sequence:'asc'})
        const appetizers = await Post.find({
            $and:[
                {menu:'dinner'},
                {section:'appetizers'}
            ]
        }).sort({sequence:'asc'})
        const entrees = await Post.find({
            $and:[
                {menu:'dinner'},
                {section:'entrees'}
            ]
        }).sort({sequence:'asc'})
        const sides = await Post.find({section:'sides'}).sort({sequence:'asc'})
        res.render('editDinner.ejs',{req:req,
                                     charcuterie:charcuterie,
                                     appetizers:appetizers,
                                     entrees:entrees,
                                     sides:sides,
                                     title:'EDIT DINNER MENU'})
    },
    updateItem: async (req,res)=>{
        try{
            const item = await Post.findById(req.params.id)
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
            await Post.findByIdAndUpdate(req.params.id,req.body)
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
    }
}