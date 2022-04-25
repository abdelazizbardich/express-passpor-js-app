const express = require('express')
const Router = express.Router()
const passport = require('passport')
const isAuthMid = require('../middlewares/Authentication')
const userModel = require('../models/User')
Router.use(express.urlencoded({extended:false}))

Router.get('/',isAuthMid,(req,res)=>{
    res.render('home');
})
Router.get('/register',(req,res)=>{
    res.render('auth/register')
})
Router.post('/register',async(req,res)=>{
    const user = userModel.create(req.body)
    res.redirect('/login')
})
Router.get('/login',(req,res)=>{
    res.render('auth/login')

})
Router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/login'
}))

Router.get('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/login')
})

module.exports = Router 