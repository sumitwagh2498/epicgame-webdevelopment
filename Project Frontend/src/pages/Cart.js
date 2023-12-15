
import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth,use} from '../context/auth';
import axios from 'axios';
import toast from "react-hot-toast";
import Layout from '../components/Layout/Layout';


export const Cart = () => {
  const [games, setGames] = useState([])  
  const[auth,setAuth]=useAuth() 
  const navigate = useNavigate();


   const getCartItems = async () => {
            try { 
              console.log(auth.user.email)
              const { data } = await axios.get(`http://127.0.0.1:5400/api/cart/cartitems/${auth.user.email}`);
              setGames(data.cart);
            } catch (error) {
              console.log(error);
              toast.error("Something Went Wrong");
            }
          };
          useEffect(()=>{
            if(!auth.user)
            {
                navigate("/login")
            }
            getCartItems()
        },[]) 
        
        const handleDelete = async (pId) => {
          try {
            const { data } = await axios.delete(
              `http://127.0.0.1:5400/api/cart/deleteitem/${pId}` );
            if (data.success) {
              toast.success(`Item deleted from cart`);
      
              getCartItems();
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error("Somtihing went wrong");
          }
        };
  return (
    <Layout>
       <h2>CART ITEMS</h2>
       <div className="d-flex flex-wrap">
            {games?.map((p) => (
              <div className="card m-3" style={{ width: "21rem" }}>
                <img
                  src={`http://127.0.0.1:5400/api/game/game-photobyname/${p.title}`}
                  className="card-img-top"
                  alt={p.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button className="btn btn-danger" onClick={() => { handleDelete(p._id);}}>
                    REMOVE FROM CART
                    </button> 
                  <button class="btn btn-secondary ms-1">BUYNOW</button>
                </div>
              </div>
            ))}
          </div>
    </Layout>
    
  )
}

export default Cart

// import React, { useEffect,useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth,use} from '../context/auth';
// import axios from 'axios';
// import toast from "react-hot-toast";

// const Cart = () => {
//     const[navigate,setNavigate]=useNavigate();
//     const[auth,setAuth]=useAuth()
//     const [games, setGames] = useState([])

//     const  getCartItems = async () => {
//         try { 
//           const { data } = await axios.get(`http://127.0.0.1:5400/api/cart/cartitems/:${auth.user.email}`);
//           setGames(data.games);
//         } catch (error) {
//           console.log(error);
//           toast.error("Something Went Wrong");
//         }
//       };
//       useEffect(()=>{
//         if(!auth.user)
//         {
//             navigate("/login")
//         }
//         getCartItems()
//     },)
     
//     return (
//         // <div className="col-md-9">
//         //     <h1 className="text-center">CART DETAILS</h1>
//         //     <div className="d-flex flex-wrap">
//         //         {games?.map((p) => (
//         //             <div className="card m-2" style={{ width: "18rem" }}>
//         //                 <img
//         //                     src={`http://127.0.0.1:5400/api/cart/photocartitems/${p._id}`}
//         //                     className="card-img-top"
//         //                     alt={p.title}
//         //                 />
//         //                 <div className="card-body">
//         //                     <h5 className="card-title">{p.title}</h5>
//         //                     <h5>RS:{p.price}</h5>
//         //                     <p className="card-text">
//         //                         {p.description.substring(0, 30)}...
//         //                     </p>
//         //                     <p className="card-text"> $ {p.price}</p>
//         //                     <button class="btn btn-primary ms-1">REMOVE</button>
//         //                     <button class="btn btn-secondary ms-1">BUY NOW</button>
//         //                 </div>
//         //             </div>
//         //         ))}
//         //     </div>
//         // </div>
// )}

// export default Cart