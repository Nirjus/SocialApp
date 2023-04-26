const Post = require("../models/post");
const User = require("../models/user");

module.exports.home =async function(req,res){
    // return res.end("<h1>express is up for majorproject</h1>")
    // console.log(req.cookies);
    // res.cookie("user_id",25);
//  Post.find({},function(err,posts){
//     return res.render("home",{
//         title:"Codial | Home",
//         posts:posts
//     })
//  })

try {
  //populate user to each post 
let posts = await Post.find({})
.populate({
  path:"comments",
   populate:{
    path:"user"
   }
})
.populate('user')
let users = await User.find({})
return res.render("home",{
title:"Codial | Home",
posts:posts,
all_users : users
});
} catch (err) {
  console.log("Error",err);
  return;
}
  
}
