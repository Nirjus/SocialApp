const Post = require("../models/post");

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
//populate user to each post 

  let posts = await Post.find({}).populate('user').exec();
  if(posts){
    return res.render("home",{
        title:"Codial | Home",
        posts:posts
    });
  }
}
