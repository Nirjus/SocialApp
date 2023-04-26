const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts"); // include library
const port = 8000;
const db = require("./config/mongoose");
//   used for session cookie and passport library
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-stratagy");
const mongoStore = require("connect-mongo");  //mongoStore is use to store the session cookie in the DB
const Sass = require("sass");
const flash = require("connect-flash");
const customMware = require("./config/middleware")
// app.use(Sass({
//     src:"./assets/scss",
//     dest:"./assets/css",
//     debug:true,
//     indentedSyntax:false,
//     outputStyle:"extended",
//     prefix:"/css"
// }))

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);   //use this library

 app.use(express.static("./assets"));
//extract style and script from sub pages into the layout
 app.set("layout extractStyles", true);
 app.set("layout extractScripts", true);

//setup the view engine
app.set("view engine","ejs");
app.set("views","./views");


app.use(session({
    name:"codial",
    secret:"blahdsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new mongoStore({
        mongoUrl: 'mongodb://127.0.0.1:27017/codial_development',
        mongooseConnection:db,
        autoRemove: "desabled"
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