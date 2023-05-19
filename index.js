const express = require("express");
const env = require("./config/environment");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser");
require("./config/view-helpers")(app);

const expressLayouts = require("express-ejs-layouts"); // include library
const port = 8000
const db = require("./config/mongoose");
//   used for session cookie and passport library
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-stratagy");
const passportJWT = require("./config/passport-jwt-stratetegy");
const passportGoogle = require("./config/passport-google-oauth2-strategy")

const mongoStore = require("connect-mongo");  //mongoStore is use to store the session cookie in the DB
var dotenv = require("dotenv").config();
const Sass = require("sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
const cors = require("cors");
const path = require("path");
app.use(cors());
//chat server will be used with socket.io
const chatServer = require("http").Server(app);
const chatSocket = require('./config/chat_socket').chatSocket(chatServer)
chatServer.listen(5000);
console.log("chat server is listen on port 5000");

if(env.name == "development"){
    app.use(Sass({
        src:path.join(__dirname,env.asset_path,'scss'),
        dest:path.join(__dirname,env.asset_path,'css'),
        debug:true,
        indentedSyntax:false,
        outputStyle:"extended",
        prefix:"/css"
    }))
}

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


 app.use(express.static(env.asset_path));
 //make the uploads path to the browser  
 app.use("/uploads",express.static(__dirname+"/uploads"));
 app.use(morgan(env.morgan.mode,env.morgan.options));
 app.use(expressLayouts);   //use this library
//extract style and script from sub pages into the layout
 app.set("layout extractStyles", true);
 app.set("layout extractScripts", true);

//setup the view engine
app.set("view engine","ejs");
app.set("views","./views");


app.use(session({
    name:"codial",
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
        mongoUrl:`mongodb://127.0.0.1:27017/${env.db}`,
        mongooseConnection:db,
        autoRemove: "desabled",
    },
      function(err){
        console.log(err || "connection-mongodb is ok");
      }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use("/",require("./routes"));

//setup database schema


app.listen(port,function(err){
    if(err){
    console,log(`Error in running the port: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
})