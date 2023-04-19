const mongoose = require("mongoose");
main().then(()=>{
  console.log("data base is connected successfuly");
}) 
.catch((err)=>{
    console,log(`database is not connected ,${err} occured`);
    return
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/codial_development")
}