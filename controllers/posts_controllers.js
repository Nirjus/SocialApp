module.exports.posts = function(req,res){
    // res.end("<h1>Users posts</h1>");

    return res.render("home",{
        title:"Posts"
    })
}