import React from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [games, setGames] = useState([])
  const[selected,setSelected]=useState([])
  const [userid, setuserid] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  


  const getAllGames = async () => {
    try {
      
      const { data } = await axios.get("http://127.0.0.1:5400/api/game/get-games");
      setGames(data.games);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getAllGames();
  }, []);
  
  const addToCart = async () => {
   
    try {
      console.log(userid)
      const { data } = axios.post(
        "http://127.0.0.1:5400/api/cart/additem",{
          userid:userid,title,price,description,category,photo
        }
       
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Added to cart");
       // navigate("/dashboard/admin/game");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const handleCart=async(p)=>{
 
    const stitle=p.title;
    const sdescription=p.description;
    const suserid=auth.user.email;
    const scategory=p.category;
    const sprice=p.price;
    const sphoto=p.photo;
    setTitle(`${stitle}`);
    setDescription(`${sdescription}`);
    setuserid(`${suserid}`);
    setCategory(`${scategory}`);
    setPhoto(`${sphoto}`);
    setPrice(`${sprice}`);
    console.log(title)
    console.log(photo)
    setTimeout(await addToCart(),1000)
  }
  return (
    <Layout>
      <div className="d-flex flex-wrap">
            {games?.map((p) => (
              <div className="card m-3" style={{ width: "21rem" }}>
                <img
                  src={`http://127.0.0.1:5400/api/game/game-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button className="btn btn-danger" onClick={()=>{
                      if(!auth.user){navigate("/login")} else{handleCart(p)}}}>
                    ADD TO CART
                    </button> 
                  <button class="btn btn-secondary ms-1">BUYNOW</button>
                </div>
              </div>
            ))}
          </div>
    </Layout>
  );
};
export default HomePage;

