import express from "express";
import { registerController, loginController,testController,forgotPasswordController,updateProfileController} from './../controllers/authController.js';
import{isAdmin,requireSign} from "../middlewares/authMidleware.js"

const router = express.Router();

//routing
//register || post

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/test",requireSign, isAdmin,testController);

router.post("/forgot-password",forgotPasswordController);

router.put("/profile",requireSign,updateProfileController);

// protected route auth
router.get("/user-auth",requireSign,(request,response)=>{
    response.status(200).send({ok:true})
})

//protected route Admin
router.get("/admin-auth",requireSign,isAdmin,(request,response)=>{
    response.status(200).send({ok:true})
})
export default router;