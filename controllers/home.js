const Post = require('../models/Post')
const Wine = require('../models/Wine')
const MenuItem = require('../models/MenuItem')

module.exports={
    getIndex:async(req,res)=>{
        const charcuterie = await MenuItem.find({section:'charcuterie'}).sort({sequence:'asc'})
        const appetizers = await MenuItem.find({
            $and: [
                {menu:'dinner'},
                {section:'appetizers'}
            ]
            }).sort({sequence:'asc'})
        const entrees = await MenuItem.find({
            $and: [
                {menu:'dinner'},
                {section:'entrees'}
            ]
            }).sort({sequence:'asc'})
        const sides = await MenuItem.find({section:'sides'}).sort({sequence:'asc'})
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
                  ],
                }).sort({sequence:'asc'})
        const entrees = await MenuItem.find({
            $and: [
                    {menu:'specials'},
                    {section:'entrees'},
                  ],
                }).sort({sequence:'asc'})
        const desserts = await MenuItem.find({
            $and:[
                {menu:'specials'},
                {section:'desserts'}
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
                    {section:'desserts'}
            ],
        }).sort({sequence:'asc'})
        res.render('dessert.ejs',{title:'DESSERTS',
                                  desserts:desserts,
                                  req:req})
    },
    getDrinks: async(req,res)=>{
        const craftDrinks = await MenuItem.find({section:'craft drinks'}).sort({sequence:'asc'})
        const sangria = await MenuItem.find({section:'sangria'}).sort({sequence:'asc'})
        const nonAlcoholic = await MenuItem.find({section:'non-alcoholic'}).sort({sequence:'asc'})
        const beerCans = await MenuItem.find({section:'beer can'}).sort({sequence:'asc'})
        const beerDrafts = await MenuItem.find({section:'beer draft'}).sort({sequence:'asc'})
        res.render('drinks.ejs',{title:'COCKTAILS',
                                 craftDrinks:craftDrinks,
                                 sangria:sangria,
                                 nonAlcoholic:nonAlcoholic,
                                 beerCans:beerCans,
                                 beerDrafts:beerDrafts,
                                 req:req})
    },
    getWine: async(req,res)=>{
        const btgCava = await MenuItem.find({section:'btg cava'}).sort({sequence:'asc'})
        const btgWhites = await MenuItem.find({section:'btg whites'}).sort({sequence:'asc'})
        const btgRose = await MenuItem.find({section:'btg rose'}).sort({sequence:'asc'})
        const btgReds = await MenuItem.find({section:'btg reds'}).sort({sequence:'asc'})
        const btgSherries = await MenuItem.find({section:'btg sherries'}).sort({sequence:'asc'})
        const cavaChampagne = await MenuItem.find({section:'cava champagne'}).sort({sequence:'asc'})
        res.render('wine.ejs',{title:'WINE',
                               btgCava:btgCava,
                               btgWhites:btgWhites,
                               btgRose:btgRose,
                               btgReds:btgReds,
                               btgSherries:btgSherries,
                               cavaChampagne:cavaChampagne,
                               req:req})
    }
}