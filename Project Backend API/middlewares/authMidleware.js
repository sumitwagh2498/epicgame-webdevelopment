import { User } from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const requireSign = (request, response, next) => {
    try {
        const decode = JWT.verify(request.headers.authorization, process.env.JWT_SECRET);
        request.user=decode;
        next();
    }
    catch (error) {
        console.log(error);
        response.send("token is invalid")
    }

}


//admin access

export const isAdmin=async(request,response,next)=>{
        try{
                const user=await User.findById(request.user._id);
                if(user.role !== 1 ){
                    return response.status(401).send({success:false,message:"UnAuthorized Access"});
                }else{
                    next();
                }
        }
        catch(error){
                console.log(error);
                response.status(401).send({
                    success:false,
                    error,
                    message:"error in admin middleware"
                })
        }
}