const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");


module.exports.create =async function(req,res){
    // res.end("<h1>Users posts</h1>");
try {
    let post = await Post.create({
        content:req.body.content,
        user:req.user._id
    });

    if(req.xhr){
        post = await post.populate('user','name');

        return res.status(200).json({
            data:{
                post:post
            },
            message:"Post Created!"
        });
    }
    req.flash("success","Post published")
        return res.redirect("back"); 
} catch (error) {
    req.flash("error",error)
      // added this to view the error on console as well
      console.log(error);
    return res.redirect("back"); 
}
   
}

module.exports.destroy =async function(req,res){
    try {
        let post = await Post.findById(req.params.id)
        if(post.user == req.user.id){

            //delete the likes for the post and all its comments kies too
            await Like.deleteMany({likeable:post, onModel:"Post"});
            await Like.deleteMany({_id:{$in: post.comments}});
         post.remove();
     
        await Comment.deleteMany({post:req.params.id});

       if(req.xhr){
        return res.status(200).json({
            data:{
                post_id: req.params.id
            },
            message:"Post deleted successfully"
        })
       }

        req.flash("success","Post and associated comments are deleted!")
        return res.redirect("back");
        }
         else{
            req.flash("error","You cannot delete this post")   
          return res.redirect("back");
         }
    } catch (error) {
        req.flash("error",error)
        return res.redirect("back"); 
    }

}