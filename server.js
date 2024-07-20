const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')
const editRoutes = require('./routes/edit')
const printRoutes = require('./routes/print')
const menuItemRoutes = require('./routes/menuItem')
require('dotenv').config({path:'./config/.env'})
require('./config/passport')(passport)
connectDB()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) //node deprecated???
app.use(express.json()) //node deprecated??
app.use(logger('dev'))
app.use(methodOverride('_method'))
app.use(
    session({
        secret: 'keyboard cat',
        resave:false,
        saveUninitialized:false,
        store: new MongoStore({mongooseConnection:mongoose.connection}),
    })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/', mainRoutes)
app.use('/edit', editRoutes)
app.use('/print', printRoutes)
app.use('/post', postRoutes)
app.use('/menuItem', menuItemRoutes)
app.listen(process.env.PORT, ()=> console.log(`Server Running: PORT ${process.env.PORT}`))
