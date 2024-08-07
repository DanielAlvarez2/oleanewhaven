const cloudinary = require('../middleware/cloudinary')
const Post = require('../models/Post')
const Wine = require('../models/Wine')

module.exports = {
    getProfile: async (req,res)=>{
        try{
            const posts = await Post.find({user:req.user.id}).sort({createdAt:'desc'})
            res.render('profile.ejs',{posts:posts,
                                      user:req.user,
                                      title:'Profile Page',
                                      req:req})
        }catch(err){
            console.log(err)
        }
    },
    getFeed: async (req,res)=>{
        try{ 
            const posts = await Post.find().sort({createdAt:'desc'}).lean()
            res.render('feed.ejs',{posts:posts,
                                   title:'Feed',
                                   req:req})
        }catch(err){
            console.log(err)
        }
    },
    getPost: async(req,res)=>{
        try{
            let test=JSON.stringify(req.params)
            console.log(test)
            console.log('req.params: '+req.params)
            console.log('req.params.id: '+req.params.id)
            console.log('req.params._id: '+req.params._id)
            const post = await Post.findById(req.params.id)
            res.render('post.ejs',{post:post,
                                   user:req.user,
                                   title:'View Post',
                                   req:req})
        }catch(err){
            console.log(err)
        }
    },
    createPost:async(req,res)=>{
        try{
            
            const result = await cloudinary.uploader.upload(req.file.path)

            await Post.create({
                menu:req.body.menu,
                section:req.body.section,
                title:req.body.title,
                image:result.secure_url,
                cloudinaryId:result.public_id,
                caption:req.body.caption,
                price:req.body.price,
                allergies:req.body.allergies,
                sequence:req.body.sequence,
                likes:0,
                user:req.user.id,
            })
            console.log('Post has been added!')
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    createWine: async(req,res)=>{
        try{
            await Wine.create({
                menu:req.body.menu,
                section:req.body.section,
                grapes:req.body.grapes,
                name:req.body.name,
                vintage:req.body.vintage,
                description:req.body.description,
                price:req.body.price,
                sequence:req.body.sequence,
            })
            console.log('Wine has been created!')
            res.redirect('/profile')
        }catch(err){
            console.log(err)
        }
    },
    likePost: async(req,res)=>{
        try{
            await Post.findOneAndUpdate(
                {_id:req.params.id},
                {
                    $inc:{likes:1},
                }
            )
            console.log('Likes +1')
            res.redirect(`/post/${req.params.id}`)
        }catch(err){
            console.log(err)
        }
    },
    deletePost: async(req,res)=>{
        try{
            
            let post = await Post.findById({_id:req.params.id})

            await cloudinary.uploader.destroy(post.cloudinaryId)

            await Post.deleteOne({_id:req.params.id})
            console.log('Deleted Post')
            res.redirect(req.get('referer'))
        }catch(err){
            res.redirect(req.get('referer'))
        }
    },
}