const nodemailer = require("../config/nodemailer");

//this is anather way of exporting
exports.newComment = (comment) => {
    console.log("inside new comment mailer",comment);
     let htmlString = nodemailer.randerTemplate({comment:comment},"/comments/new_comment.ejs")
    nodemailer.transporter.sendMail({
        from: "karmakarnirjus4839@gmail.com",
        to:comment.user.email,
        subject:"New Comment Published!",
        html:htmlString
    },(err,info) => {
        if(err){
       console.log("error in sending mail",err);
       return;
        }
        // console.log("mwssage sent", info);
        return;
    });
}