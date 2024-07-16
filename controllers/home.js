const Post = require('../models/Post')
const Wine = require('../models/Wine')
const MenuItem = require('../models/MenuItem')
const User = require('../models/User')

module.exports={
    getIndex:async(req,res)=>{
        const charcuterie = await MenuItem.find({
            $and:[
                {section:'charcuterie'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const appetizers = await MenuItem.find({
            $and: [
                {menu:'dinner'},
                {section:'appetizers'},
                {archived:false}
            ]
            }).sort({sequence:'asc'})
        const entrees = await MenuItem.find({
            $and: [
                {menu:'dinner'},
                {section:'entrees'},
                {archived:false}
            ]
            }).sort({sequence:'asc'})
        const sides = await MenuItem.find({
            $and:[
                {section:'sides'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        res.render('index.ejs',{req:req,
                                title:'HOME PAGE', 
                                charcuterie:charcuterie, 
                                appetizers:appetizers,
                                entrees:entrees,
                                sides:sides})
    },
    getSpecials: async(req,res)=>{
        const appetizers = await MenuItem.find({
            $and: [
                    {menu:'specials'},
                    {section:'appetizers'},
                    {archived:false}   
                  ],
                }).sort({sequence:'asc'})
        const entrees = await MenuItem.find({
            $and: [
                    {menu:'specials'},
                    {section:'entrees'},
                    {archived:false}
                  ],
                }).sort({sequence:'asc'})
        const desserts = await MenuItem.find({
            $and:[
                {menu:'specials'},
                {section:'desserts'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})        
        res.render('specials.ejs', 
                    {title:'SPECIALS',
                    appetizers:appetizers,
                    entrees:entrees,
                    desserts:desserts,
                    req:req,})
    },
    getDesserts: async(req,res)=>{
        const desserts = await MenuItem.find({
            $and: [
                    {menu:'dessert'},
                    {section:'desserts'},
                    {archived:false}
            ],
        }).sort({sequence:'asc'})
        res.render('dessert.ejs',{title:'DESSERTS',
                                  desserts:desserts,
                                  req:req})
    },
    getDrinks: async(req,res)=>{
        const craftDrinks = await MenuItem.find({
            $and:[
                {section:'craft drinks'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const sangria = await MenuItem.find({
            $and:[
                {section:'sangria'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const nonAlcoholic = await MenuItem.find({
            $and:[
                {section:'non-alcoholic'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const beerCans = await MenuItem.find({
            $and:[
                {section:'beer can'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const beerDrafts = await MenuItem.find({
            $and:[
                {section:'beer draft'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        res.render('drinks.ejs',{title:'COCKTAILS',
                                 craftDrinks:craftDrinks,
                                 sangria:sangria,
                                 nonAlcoholic:nonAlcoholic,
                                 beerCans:beerCans,
                                 beerDrafts:beerDrafts,
                                 req:req})
    },
    getWine: async(req,res)=>{
        const btgCava = await MenuItem.find({
            $and:[
                {section:'btg cava'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const btgWhites = await MenuItem.find({
            $and:[
                {section:'btg whites'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const btgRose = await MenuItem.find({
            $and:[
                {section:'btg rose'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const btgReds = await MenuItem.find({
            $and:[
                {section:'btg reds'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const btgSherries = await MenuItem.find({
            $and:[
                {section:'btg sherries'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const cavaChampagne = await MenuItem.find({
            $and:[                
                {section:'cava champagne'},
                {archived:false}
            ]            
        }).sort({sequence:'asc'})
        const rose = await MenuItem.find({
            $and:[
                {section:'rose'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const whiteSpain = await MenuItem.find({
            $and:[
                {section:'white spain'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const whiteFrance = await MenuItem.find({
            $and:[
                {section:'white france'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const whiteItaly = await MenuItem.find({
            $and:[
                {section:'white italy'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const whiteGermany = await MenuItem.find({
            $and:[
                {section:'white germany'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const redSpain = await MenuItem.find({
            $and:[
                {section:'red spain'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const redFrance = await MenuItem.find({
            $and:[
                {section:'red france'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const redItaly = await MenuItem.find({
            $and:[
                {section:'red italy'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        res.render('wine.ejs',{title:'WINE',
                               btgCava:btgCava,
                               btgWhites:btgWhites,
                               btgRose:btgRose,
                               btgReds:btgReds,
                               btgSherries:btgSherries,
                               cavaChampagne:cavaChampagne,
                               rose:rose,
                               whiteSpain:whiteSpain,
                               whiteFrance:whiteFrance,
                               whiteItaly:whiteItaly,
                               whiteGermany:whiteGermany,
                               redSpain:redSpain,
                               redFrance:redFrance,
                               redItaly:redItaly,
                               req:req})
    },
    getUsers: async(req,res)=>{
        const allUsers = await User.find()
        console.log(allUsers)
        res.redirect(req.get('referer'))
    },
    newUser: async(req,res)=>{
        res.render('newUser.ejs',{title:'NEW USER',req:req})
    }
}