const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;

const crypto = require("crypto");
const user = require("../models/user");
const User = require("../models/user");

//tell passport to use stratigy for google login
passport.use(new googleStrategy({
    clientID: "421038468128-mr446k0d34v0kt5cp017b7c3chu7ulla.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
  },
   function(accessToken,refreshToken,profile,done){
   User.findOne({email:profile.emails[0].value}).exec(function(err,user){
    if(err){console.log("error in google strategy-passport",err);return;}
    console.log(profile);

    if(user){
        //if found , set this as req.user
        return done(null,user);
    }else{
        //if not found, create the user and get it as req-user
        User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password:crypto.randomBytes(20).toString("hex")
        },function(err,user){
            if(err){console.log("crror in creating user google stratigy passport",err); return;}
            return done(null,user);
        })
    }
   })
   }   
))