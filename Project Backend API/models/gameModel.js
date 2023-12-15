import mongoose from "mongoose"
import{Schema} from "mongoose"

const gamesSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    releasedate:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'category',
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
   
},{timestamps:true}) 


export const Games=mongoose.model("games",gamesSchema);

export default mongoose.model("games",gamesSchema);