import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import gamesRoutes from "./routes/gamesRoute.js"
import cartRoutes from "./routes/cartRoute.js"
import cors from "cors"
const app= express();

dotenv.config();

app.use(express.json());

app.use(cors());

//Routes
app.use("/api",authRoutes);

app.use("/api/category",categoryRoutes);

app.use("/api/game",gamesRoutes);

app.use("/api/cart",cartRoutes)

//rest api
app.get("/",(request,response)=>{
    response.send({message:"welcome to gaming app"})

})


const dbconnection=async()=>{
    try{
         await mongoose.connect('mongodb://127.0.0.1:27017/gamingapp');
         console.log("database connection successfull");
    }
    catch(error){
        console.log(error);
    }
}

const PORT=process.env.PORT || 5400;
    
app.listen(5400,(request,response)=>{
    console.log(`server started ${process.env.DEV_MODE}mode on port ${PORT}`);
    dbconnection();
})
