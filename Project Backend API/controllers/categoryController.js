import slugify from "slugify";
import { Category } from "../models/categoryModel.js";


export const createCategoryController=async(request,response)=>{
        try{
            const {name}=request.body;
            if(!name){
                return response.status(401).send({message:"name is required"})
            }

            const existingCategory=await Category.findOne({name})
            if(existingCategory){
                return response.status(200).send({success:true,message:"Category Already exist"});
            }
             const reqData=request.body;
             const cname=reqData.name;
             const slug=slugify(reqData.name);
             const catreqData={name:cname,slug:slug};
            const category=new Category(catreqData);
            await category.save();
            response.status(201).send({success:true,message:"category created successfully",category});
        }
        catch(error){
            console.log(error);
            response.status(500).send({success:false,message:"error in category create" })
        }
}

//updatecategory

export const updateCategoryController=async(request,response)=>{
    try{
        const{name}=request.body;
        const{id}=request.params;
        const category=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        response.status(200).send({success:true,message:"category Updated Successfully",category})
    }
    catch(error){
        console.log(error);
        response.status(500).send({success:false,message:"error in category update" });
    }
}

//delete category

export const deleteCategoryController=async(request,response)=>{
    try{
            const{id}=request.params;
            const category=await Category.findByIdAndDelete(id);
            response.status(200).send({success:true,message:"category deleted Successfully",category})
    }
    catch(error){
        console.log(error)
        response.status(500).send({success:false,message:"error in category delete" });
    }
}

//get all categories

export const getCategoryController=async(request,response)=>{
    try{
        const category= await Category.find();
        response.status(200).send({success:true,message:"Categories fetched successfully",category});

    }
    catch(error){
        console.log(error);
        response.status(500).send({success:false,message:"error in fetch category" });
    }
}

//get single category

export const CategoryController=async(request,response)=>{
    try{
        const id=request.params.id;
        const category= await Category.find({slug:id});
        response.status(200).send({success:true,message:"Categories fetched successfully",category});

    }
    catch(error){
        console.log(error);
        response.status(500).send({success:false,message:"error in fetch single category" });
    }
}