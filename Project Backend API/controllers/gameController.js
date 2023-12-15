import { Games } from "../models/gameModel.js";
import fs from "fs";
import slugify from "slugify";
import gameModel from "../models/gameModel.js"
import { Category } from "../models/categoryModel.js";


//create game controller

export const createGameController = async (request, response) => {
    try {
        const { title, price, description, about, releasedate, category, } = request.fields;
        const { photo } = request.files;

        //validation
        switch (true) {
            case !title:
                return response.status(500).send({ error: "title is required" });
            case !price:
                return response.status(500).send({ error: "price is required" });
            case !description:
                return response.status(500).send({ error: "description is required" });
            case !about:
                return response.status(500).send({ error: "about is required" });
            case !category:
                return response.status(500).send({ error: "category is required" });
            case !releasedate:
                return response.status(500).send({ error: "releasedate is required" });
            case photo && photo.size > 4000000:
                return response.status(500).send({ error: "Image is required and size should be less than 4 mb" });

        }
        const games = new Games({ ...request.fields });
        if (photo) {
            games.photo.data = fs.readFileSync(photo.path);
            games.photo.contentType = photo.type;
        }
        await games.save();
        response.status(201).send({ success: true, message: "game added successfully", games });

    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error in creating game" })
    }
}

//get game controller

export const getGameController = async (request, response) => {
    try {
        const games = await Games.find({}).select("-photo").limit(12).sort({ createdAt: -1 });
        response.status(201).send({ success: true, message: "games fetched successfully", totalgames: games.length, games });
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error in fetching games" })
    }
}

//get single game controller

export const getSingleGameController = async (request, response) => {
    try {
        
        const games = await Games.findOne({_id:request.params.id}).select("-photo").populate("category");
        response.status(201).send({ success: true, message: "game fetched successfully",games })
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error in fetching games" })
    }

}

//get games photo

export const gamePhotoController = async (request, response) => {
    try {
        
        const games = await gameModel.findById(request.params.gid).select("photo");
        if(games.photo.data){
            response.set('Content-type', games.photo.contentType);
            return response.status(200).send(games.photo.data)
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error while getting photo" })
    }

}
export const gamePhotoControllerByName = async (request, response) => {
    try {
        
        const games = await gameModel.findOne({title:request.params.gname}).select("photo");
        if(games.photo.data){
            response.set('Content-type', games.photo.contentType);
            return response.status(200).send(games.photo.data)
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error while getting photo" })
    }

}

//get photo for cart item

export const cartPhotoController = async (request, response) => {
    try {
        
        const games = await gameModel.findById(request.params.id).select("photo");
        if(games.photo.data){
            return response.status(200).send(games.photo.data)
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error while getting photo for cart" })
    }

}

//delete controller

export const deleteGameController=async (request, response) => {
    try {
        
        const games = await Games.findByIdAndDelete(request.params.gid).select("-photo");
        response.status(200).send({ success: true, message: "game deleted successfully",games })
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error in deleting game" })
    }
}


//update controller

export const updateGameController=async (request, response) => {
    try {
        const { title, price, description, about, releasedate, category, } = request.fields;
        const { photo } = request.files;

        //validation
        switch (true) {
            case !title:
                return response.status(500).send({ error: "title is required" });
            case !price:
                return response.status(500).send({ error: "price is required" });
            case !description:
                return response.status(500).send({ error: "description is required" });
            case !about:
                return response.status(500).send({ error: "about is required" });
            case !category:
                return response.status(500).send({ error: "category is required" });
            case !releasedate:
                return response.status(500).send({ error: "releasedate is required" });
            case photo && photo.size > 2000000:
                return response.status(500).send({ error: "Image is required and size should be less than 2 mb" });

        }
        const games = await Games.findByIdAndUpdate(request.params.gid,{...request.fields},{new:true});
        if (photo) {
            games.photo.data = fs.readFileSync(photo.path);
            games.photo.contentType = photo.type;
        }
        await games.save();
        response.status(201).send({ success: true, message: "game updated successfully", games });

    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error in updating game" })
    }
}

//gameFilter contoller

export const gameFilterController=async (request, response) => {
    try {
            const {checked,radio}=request.body;
            let args={}
            if(checked.length > 0)args.category=checked;
            if(radio.length) args.price={$gte:radio,$lte:radio[1]};
            const games=await Games.find(args);
            response.status(200).send({ success: true, games })
    }
    catch (error) {
        console.log(error);
        response.status(400).send({ success: false, message: "error while filtering games" });
    }
}

//game count controller

export const gamesCountController=async (request, response) => {
    try {
            const total=await Games.find({}).estimatedDocumentCount;
            response.status(200).send({ success: true, total })
    }
    catch (error) {
        console.log(error);
        response.status(400).send({ success: false, message: "error in product cont" });
    }
}

//productListController

export const productListController=async (request, response) => {
    try {
            const perPage=10;
            const page=request.params.page ? request.params.page:1;
            const games= await Games.find({}).select("-photo").skip((page-1))*perPage.limit(perPage).sort({createdAt:-1});
            response.status(200).send({success:true,games})
    }
    catch (error) {
        console.log(error);
        response.status(400).send({ success: false, message: "error in per page ctr" });
    }
}

//searchController

export const searchController=async (request, response) => {
    try {
            const{keyword}=request.params.title;
            const result = await Games.find({$or:[{name:{$regex:keyword,$options:"i"}},
                                                 {description:{$regex:keyword,$options:"i"}}]}).select("-photo");
            
            response.json(result);
    }
    catch (error) {
        console.log(error);
        response.status(400).send({ success: false, message: "error in search controller" });
    }
}

// games based on category
export const gamesCategoryController=async (request, response) => {
    try {
           const category= await Category.findOne({slug:request.params.slug});
           const games= await Games.find({category}).populate('category');
           response.status(200).send({success:true,category,games})
    }
    catch (error) {
        console.log(error);
        response.status(400).send({ success: false, message: "error while getting games" });
        
    }
}

