const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create =async function(req,res){
    try {
        let post = await Post.findById(req.body.post)
        if(post){
          let comment =await Comment.create({
               content:req.body.content,
               post:req.body.post,
               user:req.user._id
           })
           req.flash("success","Successfuly creating a comment");
           post.comments.push(comment);
           post.save();
   
           res.redirect("/");
       }
    } catch (error) {
        req.flash("error",error);
        return;
    }
}

module.exports.destroy =async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id)
   if(comment.user == req.user.id){
    let postID = comment.post;
    comment.remove();

   let post = Post.findByIdAndUpdate(postID,{$pull:{comments : req.params.id}})
   req.flash("success","Successfuly deleating a comment");

   return res.redirect("back");
}else{
    return res.redirect("back");
}
    } catch (error) {
        req.flash("error","comment not deleating")

        return;
    }
   
}