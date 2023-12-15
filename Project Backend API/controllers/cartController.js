import { Cartitem } from "../models/cartModel.js";
// add item to cart
export const addCartController=async(request,response)=>{
    try{
        const { userid,title, price, description,photo,category, } = request.body;
      

        //validation
        switch (true) {
            case !userid:
                return response.status(500).send({ error: "userid is required" });
            case !title:
                return response.status(500).send({ error: "title is required" });
            case !price:
                return response.status(500).send({ error: "price is required" });
            case !description:
                return response.status(500).send({ error: "description is required" });
            case !category:
                return response.status(500).send({ error: "category is required" });
            case photo && photo.size > 2000000:
                return response.status(500).send({ error: "Image is required and size should be less than 2 mb" });

        }
        const cart = new Cartitem(request.body);
        await cart.save();
        response.status(201).send({ success: true, message: "cartitem added successfully", cart });
    }catch(error){

    }
}


// get items from cart
export const cartItemController=async(request,response)=>{
    try {
        const cart = await Cartitem.find({userid:request.params.userid}).select("-photo").sort({ createdAt: -1 });
        response.status(201).send({ success: true, message: "cartitem fetched successfully", totalgames: cart.length, cart });
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error in fetching cartitems" })
    }
}


// delete item from cart
export const deleteItemController=async(request,response)=>{
    try {
        
        const cart = await Cartitem.findByIdAndDelete(request.params.gid).select("-photo");
        response.status(200).send({ success: true, message: "cartitem deleted successfully",cart })
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error in deleting cartitem" })
    }
}

export const cartPhotoController = async (request, response) => {
    try {
        
        const cart = await Cartitem.findById(request.params.gid).select("photo");
        if(cart.photo.data){
            response.set('Content-type', cart.photo.contentType);
            return response.status(200).send(cart.photo.data)
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ success: false, message: "error while getting photo" })
    }

}
