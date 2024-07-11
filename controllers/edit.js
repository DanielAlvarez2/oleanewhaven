const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Wine = require('../models/Wine')
const MenuItem = require('../models/MenuItem')

module.exports={
    getDinner: async (req,res)=>{
        const charcuterie = await MenuItem.find({
            $and:[
                {section:'charcuterie'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const appetizers = await MenuItem.find({
            $and:[
                {menu:'dinner'},
                {section:'appetizers'},
                {archived:false}
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
        const cavaChampagne = await MenuItem.find({section:'cava champagne'}).sort({sequence:'asc'})
        const rose = await MenuItem.find({section:'rose'}).sort({sequence:'asc'})
        const whiteSpain = await MenuItem.find({section:'white spain'}).sort({sequence:'asc'})
        const whiteFrance = await MenuItem.find({section:'white france'}).sort({sequence:'asc'})
        const whiteItaly = await MenuItem.find({section:'white italy'}).sort({sequence:'asc'})
        const whiteGermany = await MenuItem.find({section:'white germany'}).sort({sequence:'asc'})
        const redSpain = await MenuItem.find({section:'red spain'}).sort({sequence:'asc'})
        const redFrance = await MenuItem.find({section:'red france'}).sort({sequence:'asc'})
        const redItaly = await MenuItem.find({section:'red italy'}).sort({sequence:'asc'})
        res.render('editWine.ejs',{title:'EDIT WINE',
                                   req,req,
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
                                   redItaly:redItaly})
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
                allergies:req.body.allergies,
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
    },
    moveUp: async(req,res)=>{
        try{
            const currentItem = await MenuItem.findById(req.params.id)
            const itemAbove = await MenuItem.findOne({
                $and:[
                    {sequence:currentItem.sequence-1},
                    {menu:currentItem.menu},
                    {section:currentItem.section}
                ]
            })
            await MenuItem.findByIdAndUpdate(
                {_id:req.params.id},
                {sequence:currentItem.sequence-1}
            )
            await MenuItem.findByIdAndUpdate(
                {_id:itemAbove.id},
                {sequence:currentItem.sequence}
            )
            res.redirect(req.get('referer'))
        }catch(err){
            console.log(err)
        }
    },
    moveDown: async(req,res)=>{
        try{
            const currentItem = await MenuItem.findById(req.params.id)
            const itemBelow = await MenuItem.findOne({
                $and:[
                    {sequence:currentItem.sequence+1},
                    {menu:currentItem.menu},
                    {section:currentItem.section}
                ]
            })
            await MenuItem.findByIdAndUpdate(
                {_id:req.params.id},
                {sequence:currentItem.sequence+1}
            )
            await MenuItem.findByIdAndUpdate(
                {_id:itemBelow.id},
                {sequence:currentItem.sequence}
            )
            res.redirect(req.get('referer'))
        }catch(err){
            console.log(err)
        }
    },
    getArchives: async(req,res)=>{
        try{
            const archives = await MenuItem.find({archived:true})
            res.render('archives.ejs',{title:'ARCHIVES',
                                       archives:archives,
                                       req:req})

        }catch(err){
            console.log(err)
        }
    },
    archiveMenuItem: async(req,res)=>{
        try{
            const currentItem = await MenuItem.findById(req.params.id)
            const sectionItems = await MenuItem.find({
                $and:[
                    {menu:currentItem.menu},
                    {section:currentItem.section},
                    {archived:false}
                ]
            })
            for (let i=currentItem.sequence+1;i<=sectionItems.length;i++){
                await MenuItem.findOneAndUpdate({
                    $and:[
                        {menu:currentItem.menu},
                        {section:currentItem.section},
                        {sequence:i}
                    ]},
                    {sequence:i-1}
                )
            }
            await MenuItem.findByIdAndUpdate(
                {_id:req.params.id},
                {archived:true}
            )
            res.redirect(req.get('referer'))
        }catch(err){
            console.log(err)
        }
    },
    unarchiveItem: async(req,res)=>{
        try{
            console.log(req.params.id)
            const currentItem = await MenuItem.findById(req.params.id)
            console.log(currentItem.sequence)
            const sectionItems = await MenuItem.find({
                $and:[
                    {menu:currentItem.menu},
                    {section:currentItem.section},
                    {archived:false}
                ]
            })
            console.log('length: '+sectionItems.length)
            await MenuItem.findByIdAndUpdate(
                {_id:req.params.id},
                {archived:false, sequence:sectionItems.length+1}
            )
            res.redirect(req.get('referer'))
        }catch(err){
            console.log(err)
        }
    },
    getCharcuterie: async(req,res)=>{
        try{
            const charcuterie = await MenuItem.find({
                $and:[
                    {menu:'dinner'},
                    {section:'charcuterie'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editCharcuterie.ejs',{title:'EDIT CHARCUTERIE',
                                              req:req,
                                              charcuterie:charcuterie})
        }catch(err){
            console.log(err)
        }
    },
    getAppetizers: async(req,res)=>{
        try{
            const appetizers = await MenuItem.find({
                $and:[
                    {menu:'dinner'},
                    {section:'appetizers'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editAppetizers.ejs',{title:'EDIT APPETIZERS',
                                             req:req,
                                             appetizers:appetizers})
        }catch(err){
            console.log(err)
        }
    },
    getEntrees: async(req,res)=>{
        try{
            const entrees = await MenuItem.find({
                $and:[
                    {menu:'dinner'},
                    {section:'entrees'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editEntrees.ejs',{title:'EDIT ENTREES',
                                          req:req,
                                          entrees:entrees})
        }catch(err){
            console.log(err)
        }
    },
    getSides: async(req,res)=>{
        try{
            const sides = await MenuItem.find({
                $and:[
                    {menu:'dinner'},
                    {section:'sides'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editSides.ejs', {title:'EDIT SIDES',
                                        req:req,
                                        sides:sides})
        }catch(err){
            console.log(err)
        }
    }







}