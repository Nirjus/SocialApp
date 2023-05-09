const Like = require("../models/like");
const Comment = require("../models/comment");

const Post = require("../models/post");

module.exports.toogleLike = async function(req,res){
    try{
                 //Likes/toogle/id ==abcsc=post
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"internal Server Error"
        });
    }
}