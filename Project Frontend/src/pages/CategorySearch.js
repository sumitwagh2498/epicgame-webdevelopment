import React from 'react'
import  { useState, useEffect } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { Link } from 'react-router-dom';
const CategorySearch = () => {

    const [categories, setCategories] = useState([]);

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get("http://127.0.0.1:5400/api/category/get-category");
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something wwent wrong in getting catgeory");
        }
      };
    
      useEffect(() => {
        getAllCategory();
      }, []);
    
  return (
    <Layout>
       <h2>CART ITEMS</h2>
       <div className="d-flex flex-wrap">
            {categories?.map((p) => (
                 <Link
                 key={p.slug}
                 to={`/category/search/byname/${p.slug}`}
                 className="game-link"
             >
              <div className="card m-3" style={{ width: "21rem" }}>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  
                </div>
              </div>
              </Link>
            ))}
          </div>
    </Layout>
  )
}

export default CategorySearch