const passport = require("passport");

const LocalStratagy = require("passport-local").Strategy;

const user = require("../models/user");
//Authentication using passport 
passport.use(new LocalStratagy({
    usernameField:"email"
    },
  function(email,password,done){
          //find a user and astablish identity
          user.findOne({email: email})
          .catch((err)=>{
                console.log("Error in finding user ---> Passport");
                return done(err);
        })
        .then((user)=>{
            if(!user || user.password != password){
                console.log("invalid Username/password");
                return done(null,false);
            }
            return done(null,user);
          })
  }
    
));

//serialising the user to detected which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})
//deserialising the user from the key in the cookies

passport.deserializeUser(function(id,done){
    user.findById(id)
    .catch((err)=>{
            console.log("Error in finding user ---> Passport");
            return done(err);
        })
        .then((user)=>{
        return done(null,user);
    })
})

//check if the user is authenticated
passport.checkAuthentication = function(req,res, next){
    //if the users is sign in then on the request to the next function controller
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is sign in
    return res.redirect("/users/sign-in");
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){

        //req.user contain the current sign in user from the session cookie and we just sending to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;