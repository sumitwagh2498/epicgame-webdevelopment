import { User } from "../models/userModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from "jsonwebtoken";


export const registerController = async (request, response) => {
    try {
        const { name, email, password, phone, address,answer} = request.body;
        if (!name) {
            return response.send({ error: "name is required" });
        }
        if (!email) {
            return response.send({ error: "email is required" });
        }
        if (!password) {
            return response.send({ error: "password is required" });
        }
        if (!phone) {
            return response.send({ error: "phone is required" });
        }
        if (!address) {
            return response.send({ error: "address is required" });
        }
        if (!answer) {
            return response.send({ error: "Answer is required" });
        }

        //check existing user

        const existinguser = await User.findOne({ email })

        if (existinguser) {
            return response.status(200).send({
                success: true,
                message: "user is already registered"
            })
        }

        //register user

        const hashedPassword = await hashPassword(password);
        const reqData = request.body;
        reqData['password'] = hashedPassword;
        const user = new User(reqData);
        await user.save();
        response.status(201).send({ success: true, message: "User registered successfully", user });
    }
    catch (error) {
        console.log(error)
        response.status(500).send({ success: false, message: "error in registraion", error })
    }

}

export const loginController = async (request, response) => {
    try {
        const reqData = request.body;
        if (!reqData.email || !reqData.password) {
            return response.status(404).send({ success: false, message: "inavalid username and password" });
        }

        const user = await User.findOne({ email: reqData.email });
        if (!user) {
            return response.status(404).send({ success: false, message: "User not registerd" });
        }

        const match = await comparePassword(reqData.password, user.password);
        if (!match) {
            return response.status(200).send({ success: false, message: "invalid password" });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        response.status(200).send({
            success: true, message: "Login successfull", user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role
            }, token
        });
    }

    catch (error) {
        console.log(error)
        response.status(500).send({ success: false, message: "error in login", error })
    }

}

//testCotroller

export const testController=(request,response)=>{
        console.log("middleware testing");
}

//forgot password controller

export const forgotPasswordController=async (reqest,response)=>{
    try{
        const {email,answer,newPassword}=reqest.body;
        if(!email){
            response.status(400),send({message:"Email is required"})
        };
        if(!answer){
            response.status(400),send({message:"Answer is required"})
        };
        if(!newPassword){
            response.status(400),send({message:"New Password is required"})
        }

        //check
        const user = await User.findOne({email,answer})
        if(!user){
            return response.status(404).send({success:false,message:"Wrong email or answer"});
        }

        const hashed= await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id,{password:hashed});
        return response.status(200).send({success:true,message:"Password reset successfully"});
    }
    catch(error){
        console.log(error);
        response.status(500).send({ssuccess:false,message:"something went wrong"})
    }
}

//update profile controller

export const updateProfileController=async(request,response)=>{
    try{
         const{name,email,password,address,phone}=request.body;
         const user=await User.findById(request.user._id);
         if(password && password.length < 6){
            return response.json({error:"password is required and 6 characters long"})
         }

         const hashedPassword=password ? await hashPassword(password):undefined;
         const updatedUser= await User.findByIdAndUpdate(request.user._id,{
            name:name || user.name,
            phone:phone || user.phone,
            password:hashedPassword || user.password,
            address:address || user.address,
         },{new:true})
         response.status(200).send({success:true,message:"profile updated successfully"})
    }catch(error){
        console.log(error);
        response.status(400).send({success:false,message:"error while updating profile"})
    }
}