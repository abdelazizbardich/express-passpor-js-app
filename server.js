const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
require('./config/passport')(passport)
const router = require('./routes/web-router')


// public static files
app.use(express.static('public'))
// middlewares
app.set('view engine','ejs')
app.use(session({
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(router)

app.listen(8080)

