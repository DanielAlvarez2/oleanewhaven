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
        res.render('editDinner.ejs',{req:req,
                                     charcuterie:charcuterie,
                                     appetizers:appetizers,
                                     entrees:entrees,
                                     sides:sides,
                                     title:'EDIT DINNER MENU'})
    },
    getSpecials: async (req,res)=>{
        if(req.user.role != 'manager'){
            req.session.destroy()
            req.user = null
            res.redirect('/')
        }
        const appetizers = await MenuItem.find({
            $and:[
                {menu:'specials'},
                {section:'appetizers'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const entrees = await MenuItem.find({
            $and:[
                {menu:'specials'},
                {section:'entrees'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        const desserts = await MenuItem.find({
            $and:[
                {menu:'specials'},
                {section:'desserts'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        res.render('editSpecials.ejs',{title:'EDIT SPECIALS',
                                       req:req,
                                       appetizers:appetizers,
                                       entrees:entrees,
                                       desserts:desserts})
    },
    getDessert: async(req,res)=>{
        if(!req.user) res.redirect('/dessert')
        const desserts = await MenuItem.find({
            $and:[
                {menu:'dessert'},
                {section:'desserts'},
                {archived:false}
            ]
        }).sort({sequence:'asc'})
        res.render('editDessert.ejs',{req:req,
                                      title:'EDIT DESSERTS',
                                      desserts:desserts})
        
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
    updateItem2: async(req,res)=>{
        try{
            console.log('updateItem2 req.body: '+JSON.stringify(req.body))
            const item = await MenuItem.findById(req.body.id)
            console.log('updateItem2() item: <br>'+item)
            res.render('updateItem2.ejs',({req:req,
                                           title:'UPDATE ITEM W STYLE.CSS',
                                           item:item}))
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
                image:result.secure_url,
                cloudinaryId:result.public_id
            })
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    createMenuItem: (req,res)=>{
        if(!req.user) res.redirect('/')
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
            const menuItem = await MenuItem.findById({_id:req.params.id})
            if(menuItem.cloudinaryId) await cloudinary.uploader.destroy(menuItem.cloudinaryId)
            const sectionItems = await MenuItem.find({
                $and:[
                    {menu:menuItem.menu},
                    {section:menuItem.section},
                    {archived:false}
                ]
            })
            for (let i=menuItem.sequence+1;i<=sectionItems.length;i++){
                await MenuItem.findOneAndUpdate({
                    $and:[
                        {menu:menuItem.menu},
                        {section:menuItem.section},
                        {archived:false},
                        {sequence:i}
                    ]},{sequence:i-1}
                )
            }
            
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
        if(!req.user) res.redirect('/')
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
                        {sequence:i},
                        {archived:false}
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
        if(!req.user) res.redirect('/')
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
        if(!req.user) res.redirect('/')
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
        if(!req.user) res.redirect('/')
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
        if(!req.user) res.redirect('/')
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
    },
    getCraftDrinks: async(req,res)=>{
        if(!req.user) res.redirect('/drinks')
        try{
            const craftDrinks = await MenuItem.find({
                $and:[
                    {menu:'drinks'},
                    {section:'craft drinks'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editCraftDrinks.ejs',{title:'EDIT CRAFT DRINKS',
                                              req:req,
                                              craftDrinks:craftDrinks})
        }catch(err){
            console.log(err)
        }
    },
    getSangria: async(req,res)=>{
        if(!req.user) res.redirect('/drinks')
        try{
            const sangria = await MenuItem.find({
                $and:[
                    {menu:'drinks'},
                    {section:'sangria'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editSangria.ejs', {title:'EDIT SANGRIA',
                                           req:req,
                                           sangria:sangria})
        }catch(err){
            console.log(err)
        }
    },
    getNonAlcoholic: async(req,res)=>{
        if(!req.user) res.redirect('/drinks')
        try{
            const nonAlcoholic = await MenuItem.find({
                $and:[
                    {menu:'drinks'},
                    {section:'non-alcoholic'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editNonAlcoholic.ejs', {title:'EDIT NON-ALCOHOLIC',
                                                req:req,
                                                nonAlcoholic:nonAlcoholic})
        }catch(err){
            console.log(err)
        }
    },
    getBeer: async(req,res)=>{
        if(!req.user) res.redirect('/drinks')
        try{
            const beerCans = await MenuItem.find({
                $and:[
                    {menu:'drinks'},
                    {section:'beer can'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            const beerDrafts = await MenuItem.find({
                $and:[
                    {menu:'drinks'},
                    {section:'beer draft'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editBeer.ejs',{title:'EDIT BEER',
                                       req:req,
                                       beerCans:beerCans,
                                       beerDrafts:beerDrafts})
        }catch(err){
            console.log(err)
        }
    },
    getBTG: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const btgCava = await MenuItem.find({
                $and:[
                    {menu:'wine'},
                    {section:'btg cava'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            const btgWhites = await MenuItem.find({
                $and:[
                    {menu:'wine'},
                    {section:'btg whites'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            const btgRose = await MenuItem.find({
                $and:[
                    {menu:'wine'},
                    {section:'btg rose'},
                    {archived: false}
                ]
            }).sort({sequence:'asc'})
            const btgReds = await MenuItem.find({
                $and:[
                    {menu:'wine'},
                    {section:'btg reds'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            const btgSherries = await MenuItem.find({
                $and:[
                    {menu:'wine'},
                    {section:'btg sherries'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editBTG.ejs',{title:'EDIT BTG',
                                      req:req,
                                      btgCava:btgCava,
                                      btgWhites:btgWhites,
                                      btgRose:btgRose,
                                      btgReds:btgReds,
                                      btgSherries:btgSherries})
        }catch(err){
            console.log(err)
        }
    },
    getCavaChampagne: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const cavaChampagne = await MenuItem.find({
                $and:[
                    {menu:'wine'},
                    {section:'cava champagne'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editCavaChampagne.ejs',{title:'EDIT CAVA CHAMPAGNE',
                                                req:req,
                                                cavaChampagne:cavaChampagne})
        }catch(err){
            console.log(err)
        }
    },
    getRose: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const rose = await MenuItem.find({
               $and:[
                {menu:'wine'},
                {section:'rose'},
                {archived:false}
               ] 
            }).sort({sequence:'asc'})
            res.render('editRose.ejs',{title:'EDIT ROSE',
                                   req:req,
                                   rose:rose})
        }catch(err){
            console.log(err)
        }
    },
    getWhiteSpain: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const whiteSpain = await MenuItem.find({
                $and:[
                    {menu:'wine'},
                    {section:'white spain'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editWhiteSpain.ejs',{title:'EDIT WHITE SPAIN',
                                             req:req,
                                             whiteSpain:whiteSpain})
        }catch(err){
            console.log(err)
        }
    },
    getWhiteFrance: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const whiteFrance = await MenuItem.find({
                $and:[
                    {section:'white france'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editWhiteFrance.ejs',{title:'EDIT WHITE FRANCE',
                                              req:req,
                                              whiteFrance:whiteFrance})
        }catch(err){
            console.log(err)
        }
    },
    getWhiteItaly: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const whiteItaly = await MenuItem.find({
                $and:[
                    {section:'white italy'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editWhiteItaly.ejs', {title:'EDIT WHITE ITALY',
                                              req:req,
                                              whiteItaly:whiteItaly})
        }catch(err){
            console.log(err)
        }
    },
    getWhiteGermany: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const whiteGermany = await MenuItem.find({
                $and:[
                    {section:'white germany'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editWhiteGermany.ejs',{title:'EDIT WHITE GERMANY',
                                           req:req,
                                           whiteGermany:whiteGermany})
        }catch(err){
            console.log(err)
        }
    },
    getRedSpain: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const redSpain = await MenuItem.find({
                $and:[
                    {section:'red spain'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editRedSpain.ejs',{title:'EDIT RED SPAIN',
                                           req:req,
                                           redSpain:redSpain})
        }catch(err){
            console.log(err)
        }
    },
    getRedFrance: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const redFrance = await MenuItem.find({
                $and:[
                    {section:'red france'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editRedFrance.ejs', {title:'EDIT RED FRANCE',
                                             req:req,
                                             redFrance:redFrance})
        }catch(err){
            console.log(err)
        }
    },
    getRedItaly: async(req,res)=>{
        if(!req.user) res.redirect('/wine')
        try{
            const redItaly = await MenuItem.find({
                $and:[
                    {section:'red italy'},
                    {archived:false}
                ]
            }).sort({sequence:'asc'})
            res.render('editRedItaly.ejs', {title:'EDIT RED ITALY',
                                            req:req,
                                            redItaly:redItaly})
        }catch(err){
            console.log(err)
        }
    }





}