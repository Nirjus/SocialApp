const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname,"../production_log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log',{
    interval:"1d",
    path:logDirectory
})

const  development = {
    name:"development",
    asset_path:"./assets",
    session_cookie_key:"blahdsomething",
    db:"codial_development",
    smtp:{
        service:"gmail",
        host:"smtp.gmail.com", // created domain by smtp to interect the user
        port:587,
        secure:false,
        auth:{
            user:"karmakarnirjus4839@gmail.com",
            pass:"rwpsorgrpjvkyswe"
        }
    },
    google_Client_id: "421038468128-mr446k0d34v0kt5cp017b7c3chu7ulla.apps.googleusercontent.com",
    google_Client_secret:"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",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
     jwt_secret:"codeial",
     morgan:{
        mode:"dev",
        options:{stream:accessLogStream}
     }
}

const production = {
    name:"production",
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:"gmail",
        host:"smtp.gmail.com", // created domain by smtp to interect the user
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_Client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_Client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
     jwt_secret:process.env.CODEIAL_JWT_SECRET,
     morgan:{
        mode:"combained",
        options:{stream:accessLogStream}
     }
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined? development : eval(process.env.CODEIAL_ENVIRONMENT);