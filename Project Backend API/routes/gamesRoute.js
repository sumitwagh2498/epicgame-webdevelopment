import express from"express";
import { isAdmin, requireSign } from "../middlewares/authMidleware.js";
import {createGameController} from "../controllers/gameController.js"
import formidable from "express-formidable"
import { getGameController,getSingleGameController,gamePhotoController,deleteGameController,updateGameController,
    gameFilterController,gamesCountController,productListController,searchController,cartPhotoController,gamesCategoryController,gamePhotoControllerByName} from "../controllers/gameController.js";

const router=express.Router();

//create game
router.post("/create-game",requireSign, isAdmin,formidable(),createGameController);

//update game
router.put("/update-game/:gid",requireSign, isAdmin,formidable(),updateGameController);

//get  games
router.get("/get-games",getGameController);

//get single game 
router.get("/get-game/:id",getSingleGameController);

//get photo

router.get("/game-photo/:gid",gamePhotoController);

router.get("/game-photobyname/:gname",gamePhotoControllerByName);
//delete
router.delete("/delete/:gid",deleteGameController);

//filter games

router.post("/game-filter",gameFilterController);

//count of games
router.get("/games-count",gamesCountController)

//games per page
router.get("/games-list/:page",productListController)

//searchController
router.get("/search/:title",searchController);

//category wise product
router.get("/game-category/:slug",gamesCategoryController);

//cart item photo

router.get("/cartitem/:id",cartPhotoController)


export default router;