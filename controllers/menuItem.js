const cloudinary = require('../middleware/cloudinary')
const MenuItem = require('../models/MenuItem')

module.exports = {
    createWpic: async(req,res)=>{
        try{   
            const result = await cloudinary.uploader.upload(req.file.path)
            const existingItems = await MenuItem.find({
                $and:[
                    {menu:req.body.menu},
                    {section:req.body.section},
                    {archived:false}
                ]
            })
            await MenuItem.create({
                menu:req.body.menu,
                section:req.body.section,
                name:req.body.name,
                image:result.secure_url,
                cloudinaryId:result.public_id,
                description:req.body.description,
                price:req.body.price,
                allergies:req.body.allergies,
                sequence:existingItems.length+1,
            })
            console.log('Menu Item has been added!')
            res.redirect('/')
        }catch(err){
            console.log(err)
        }
    },
    createNOpic: async(req,res)=>{
        try{
            const existingItems = await MenuItem.find({
                $and:[
                    {menu:req.body.menu},
                    {section:req.body.section},
                    {archived:false}
                ]
            })
            await MenuItem.create({
                menu:req.body.menu,
                section:req.body.section,
                name:req.body.name,
                description:req.body.description,
                price:req.body.price,
                allergies:req.body.allergies,
                sequence:existingItems.length+1,
                grapes:req.body.grapes,
                vintage:req.body.vintage
            })
        }catch(err){
            console.log(err)
        }
        console.log('req.body: '+JSON.stringify(req.body))
        res.redirect('/')
    }
}