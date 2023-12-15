import express from "express";
import { requireSign } from "../middlewares/authMidleware.js";
import{addCartController,cartItemController,deleteItemController,cartPhotoController} from "../controllers/cartController.js"

const router = express.Router();

router.post("/additem",requireSign,addCartController);

router.get("/cartitems/:userid",requireSign,cartItemController);

router.delete("/deleteitem/:gid",requireSign,deleteItemController);

router.get("/photocartitems/:gid",cartPhotoController);

export default router;