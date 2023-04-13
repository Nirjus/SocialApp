module.exports.home = function(req,res){
    // return res.end("<h1>express is up for majorproject</h1>")
    return res.render("home",{
        title:"Home"
    })
}

//modules.exports.actionNmae = function(req,res)()