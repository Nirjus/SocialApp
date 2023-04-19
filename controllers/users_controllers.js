const User = require("../models/user")

module.exports.profile = function(req,res){
    // res.end("<h1>User Profile</h1>");
 return res.render("user_profile",{
    title:"User Profile"
 })
}

//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
         return res.redirect("/users/profile");
    }
    return res.render("user_sign_up",{
        title:"Codial | Sign Up"
    })
}
//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
      return res.redirect("/users/profile");
  }
    return res.render("user_sign_in",{
        title:"Codial | Sign In"
    })
}

//get sign up data

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }
    User.findOne({email:req.body.email})
    .catch((err)=>{

            console.log("error in finding user in sign up",err);
            return;
    })
        .then((user)=>{
        if(!user){
            User.create(req.body) 
                .catch((err)=>{
                    console.log("error in creating user while sign up",err);
                    return;
                })
                   .then(()=>{
                return res.redirect("/users/sign-in");
                   })
        }else{
            return res.redirect("back");
        }
    });
}
//sign in and create a session for user
module.exports.createSession = function(req,res){
    //steps to authenticate
     return res.redirect("/");
}
//logout session 
module.exports.destroySession = function(req,res,next){
    req.logout(function(err){
        if(err){ return next(err);}
        return res.redirect("/");
    });

}
