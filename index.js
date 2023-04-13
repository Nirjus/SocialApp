const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts"); // include library
const port = 8000;

app.use(expressLayouts);   //use this library

 app.use(express.static("./assets"));
//extract style and script from sub pages into the layout
 app.set("layout extractStyles", true);
 app.set("layout extractScripts", true);
//use express router
app.use("/",require("./routes"));
//setup the view engine
app.set("view engine","ejs");
app.set("views","./views");

app.listen(port,function(err){
    if(err){
    console,log(`Error in running the port: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
})