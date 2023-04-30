const User = require("../models/user")
const fs = require("fs");
const path = require("path");

module.exports.profile = function(req,res){
    // res.end("<h1>User Profile</h1>");
    User.findById(req.params.id, function(err,user){
        return res.render("user_profile",{
            title:"User Profile",
            profile_user : user
         })
    });

}

module.exports.update =async function(req,res){


    if(req.user.id == req.params.id){
      try {
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
        if(err){console.log("*****Multer Error",err)}
         console.log(user.avatar);
        user.name  = req.body.name;
        user.email = req.body.email;

        if(req.file){

            if(user.avatar){
               fs.unlinkSync(path.join(__dirname,"..",user.avatar));
            }
            //this is the path of the uploading file into the avatar field in the user
             user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
        });
        
      } catch (error) {
        req.flash("error",error);
        return res.redirect("back");
      }
    }else{
       return res.status(401).send("unauthorized");
    }
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
        req.flash('error', 'Passwords do not match');

        return res.redirect("back");
    }
    User.findOne({email:req.body.email})
    .catch((err)=>{
        if(err){req.flash('error', err); 
        return}

    })
        .then((user)=>{
        if(!user){
            User.create(req.body) 
                .catch((err)=>{
                    if(err){req.flash('error', err); return}
                    return;
                })
                   .then(()=>{
                return res.redirect("/users/sign-in");
                   })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect("back");
        }
    });
}
//sign in and create a session for user
module.exports.createSession = function(req,res){
    //steps to authenticate
    req.flash("success","logged in Successfuly");
     return res.redirect("/");
}
//logout session 
module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        else{
            req.flash("success", "You have logged out");
            return res.redirect("/");
        }
    });
   
}
