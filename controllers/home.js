const Post = require('../models/Post')

module.exports={
    getIndex:async(req,res)=>{
        if(req.user){
            return res.redirect('/feed')
        }
        const charcuterie = await Post.find({section:'charcuterie'}).sort({sequence:'asc'})
        const appetizers = await Post.find({section:'appetizers'}).sort({sequence:'asc'})
        const entrees = await Post.find({section:'entrees'}).sort({sequence:'asc'})
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
    }
}