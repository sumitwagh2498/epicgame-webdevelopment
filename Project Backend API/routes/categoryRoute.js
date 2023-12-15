import {createCategoryController, updateCategoryController,deleteCategoryController,getCategoryController,CategoryController} from "../controllers/categoryController.js"
import express from"express"
import { isAdmin, requireSign } from '../middlewares/authMidleware.js';

const router=express.Router()

//routes

router.post("/create-category",requireSign,isAdmin,createCategoryController);

router.put("/update-category/:id",requireSign,isAdmin,updateCategoryController);

router.delete("/delete-category/:id",requireSign,isAdmin,deleteCategoryController);

router.get("/get-category",getCategoryController);

router.get("/singlecategory/:id",CategoryController)


export default router;