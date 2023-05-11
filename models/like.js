const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
    },
    //defines the object id of the the liked Object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:"onModel"
    },
 //this field is uded for defining the type of the liked scence this is a dynamic refference
    onModel:{
        type:String,
        require:true,
        enum:["Post", "Comment"]
 //this field is uded for defining the type of the liked scence this is a dynamic object

    }
},{
    timestamps:true
});


const Like = mongoose.model("Like",likeSchema);
module.exports = Like;

