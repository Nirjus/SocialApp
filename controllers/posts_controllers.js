const Post = require("../models/post");
module.exports.create = function(req,res){
    // res.end("<h1>Users posts</h1>");
    Post.create({
        content:req.body.content,
        user:req.user._id
    },
     function(err,post){
        if(err){
            console.log(err);
            return;
        }
        return res.redirect("back");
     }     
       )
}