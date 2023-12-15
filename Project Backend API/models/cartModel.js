import mongoose,{Schema} from "mongoose";

const cartSchema= new Schema({
    userid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
   
},{timestamps:true}) 

export const Cartitem = mongoose.model("cartitem",cartSchema);
