const Comment = require("../models/comment");
const Post = require("../models/post");
const Like = require("../models/like");
const commentsMailer = require("../mailers/comments_mailer");
const queue = require("../config/kue");
const commnetEmailWorker = require("../workers/comment_email_worker");
const { post } = require("../routes/posts");

module.exports.create =async function(req,res){
    try {
        let post = await Post.findById(req.body.post)
        if(post){
          let comment =await Comment.create({
               content:req.body.content,
               post:req.body.post,
               user:req.user._id
           })
         
           post.comments.push(comment);
           post.save();
         comment = await comment.populate('user',"name email");
        //  commentsMailer.newComment(comment);
       let job = queue.create("emails",comment).save(function(err){
        if(err){
            console.log("error in sending to the queue", err);
            return;
        }
        console.log("job enqueue", job.id);
       })
           if (req.xhr){
            // Similar for comments to fetch the user's id!

            return res.status(200).json({
                data: {
                    comment: comment
                },
                message: "Post created!"
            });
        }
           req.flash("success","Successfuly creating a comment");
   
           res.redirect("/");
       }
    } catch (error) {
        req.flash("error",error);
        return;
    }
}

module.exports.destroy =async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);
   if(comment.user == req.user.id ||  post.user == req.user.id){
    let postID = comment.post;
    comment.remove();

   let post = Post.findByIdAndUpdate(postID,{$pull:{comments : req.params.id}})

   //destroy the assosiated likes for this comments
   await Like.deleteMany({likeable:comment._id,onModel:"Comment"});
  
   // send the comment id which was deleted back to the views
   if (req.xhr){
    return res.status(200).json({
        data: {
            comment_id: req.params.id
        },
        message: "Post deleted"
    });
}

   req.flash("success","Successfuly deleating a comment");

   return res.redirect("back");
}else{
    req.flash('error', 'Unauthorized');
    return res.redirect("back");
}
    } catch (error) {
        req.flash("error","comment not deleating")

        return;
    }
   
}