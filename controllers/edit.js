const Post = require('../models/Post')
const Wine = require('../models/Wine')

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
    }
}