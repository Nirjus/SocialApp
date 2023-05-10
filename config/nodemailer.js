const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path= require("path");

let transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com", // created domain by smtp to interect the user
    port:587,
    secure:false,
    auth:{
        user:"karmakarnirjus4839@gmail.com",
        pass:"rwpsorgrpjvkyswe"
    }
});

let renderTemplate = (data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
    path.join(__dirname,"../views/mailers",relativePath),
    data,
    function(err,template){
        if(err){console.log("error in rendering template",err);return;}
        mailHTML = template;
    }
    )
    return mailHTML;
}

module.exports = {
      transporter:transporter,
      randerTemplate:renderTemplate
}