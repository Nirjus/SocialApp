const mongoose = require("mongoose");
const env = require("./environment");
var dotenv = require("dotenv").config();

// main().then(()=>{
//   console.log("data base is connected successfuly");
// }) 
// .catch((err)=>{
//     console,log(`database is not connected ,${err} occured`);
//     return
// })

// async function main(){
//   // console.log(process.env.MONGO_URI)
//     await mongoose.connect(process.env.MONGO_URI||`mongodb://127.0.0.1:27017/${env.db}`)

// }

async function main() {
  try {
    mongoose.connect(process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${env.db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: {
        w: "majority",
      },
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log(`Database connection error: ${err}`);
    return;
  }
}

main().catch((err) => {
  console.log(`Error occurred while connecting to the database: ${err}`);
});