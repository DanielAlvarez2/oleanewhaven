const Post = require('../models/Post')
const Wine = require('../models/Wine')

module.exports={
    getIndex:async(req,res)=>{
        if(req.user){
            return res.redirect('/feed')
        }
        const charcuterie = await Post.find({section:'charcuterie'}).sort({sequence:'asc'})
        const appetizers = await Post.find({
            $and: [
                {menu:'dinner'},
                {section:'appetizers'}
            ]
            }).sort({sequence:'asc'})
        const entrees = await Post.find({
            $and: [
                {menu:'dinner'},
                {section:'entrees'}
            ]
            }).sort({sequence:'asc'})
        const sides = await Post.find({section:'sides'}).sort({sequence:'asc'})
        res.render('index.ejs',{title:'HOME PAGE', 
                                charcuterie:charcuterie, 
                                appetizers:appetizers,
                                entrees:entrees,
                                sides:sides})
    },
    getSpecials: async(req,res)=>{
        const appetizers = await Post.find({
            $and: [
                    {menu:'specials'},
                    {section:'appetizers'},   
                  ],
                }).sort({sequence:'asc'})
        const entrees = await Post.find({
            $and: [
                    {menu:'specials'},
                    {section:'entrees'},
                  ],
                }).sort({sequence:'asc'})        
        res.render('specials.ejs', 
                    {title:'SPECIALS',
                    appetizers:appetizers,
                    entrees:entrees})
    },
    getDesserts: async(req,res)=>{
        const desserts = await Post.find({
            $and: [
                    {menu:'dessert'},
                    {section:'desserts'}
            ],
        }).sort({sequence:'asc'})
        res.render('dessert.ejs',{title:'DESSERTS',
                                  desserts:desserts})
    },
    getDrinks: async(req,res)=>{
        const drinks = await Post.find({section:'cocktails'}).sort({sequence:'asc'})
        res.render('drinks.ejs',{title:'COCKTAILS',drinks:drinks})
    },
    getWine: async(req,res)=>{
        const btgCava = await Wine.find({section:'btg cava'}).sort({sequence:'asc'})
        res.render('wine.ejs',{title:'WINE',btgCava:btgCava})
    }
}