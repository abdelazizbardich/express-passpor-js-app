const localStarategy = require('passport-local').Strategy
const UserModel = require('../models/User')
const bcrypt = require('bcryptjs')
module.exports = passportConfig = passport =>{
    passport.use(new localStarategy(
            {
                usernameField:"email",passwordField:"password"
            },
            async (email,password,done)=>{   
                const user = await UserModel.findBy('email',email)
                if(!user) return done(null,false,{message:"User not found"})
                if(!bcrypt.compareSync(password, user.password)) return done(null,false,{message:"Wrong password"})
                
                return done(null,user)
            } 
        )
    )
    passport.serializeUser((user,done)=> done(null,user.id))
    passport.deserializeUser((id,done)=> done(null,UserModel.findBy('id',id)))
}