import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateGame = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [releasedate, setReleaseDate] = useState("");
  const [photo, setPhoto] = useState("");

  const [id, setId] = useState("");

  //get single product
  const getSingleGame = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:5400/api/game/get-game/${params.id}`
      );
      setTitle(data.games.title);
      setId(data.games._id);
      setDescription(data.games.description);
      setPrice(data.games.price);
      setAbout(data.games.about);
      setReleaseDate(data.games.releasedate);
      setCategory(data.games.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleGame();
    //eslint-disable-next-line
  }, []);
  //get all category
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


  //update game function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const gameData = new FormData();
      gameData.append("title", title);
      gameData.append("description", description);
      gameData.append("price", price);
      gameData.append("about", about);
      gameData.append("releasedate", releasedate);
      gameData.append("photo", photo);
      gameData.append("category", category);

      
      const { data } = axios.put(
        `http://127.0.0.1:5400/api/game/update-game/${id}`,
        gameData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Game Updated Successfully");
        navigate("/dashboard/admin/game");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this Game ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        ` http://127.0.0.1:5400/api/game/delete/${id}`
      );
      toast.success("Game Deleted Succfully");
      navigate("/dashboard/admin/game");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
    <div className="container-fluid m-3 p-3 ">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Update Game</h1>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="game_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={title}
                placeholder="write a title"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={about}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={releasedate}
                placeholder="write a releasedate"
                className="form-control"
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>
            
            <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  </Layout>
);
};

export default UpdateGame;