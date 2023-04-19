module.exports.home = function(req,res){
    // return res.end("<h1>express is up for majorproject</h1>")
    console.log(req.cookies);
    res.cookie("user_id",25);
    return res.render("home",{
        title:"Home"
    })
}

//modules.exports.actionNmae = function(req,res)()