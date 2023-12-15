import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
export const Games = () => {
    const [games, setGames] = useState([]);

    //getall products
    const getAllGames = async () => {
        try {
            const { data } = await axios.get("http://127.0.0.1:5400/api/game/get-games");
            setGames(data.games);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllGames();
    }, []);
    return (
        <Layout>
            <div className="row ">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9 ">
                    <h1 className="text-center">All Games List</h1>
                    <div className="d-flex">
                        {games?.map((p) => (
                            <Link
                                key={p._id}
                                to={`/dashboard/admin/update-game/${p._id}`}
                                className="game-link"
                            >
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`http://127.0.0.1:5400/api/game/game-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.title}</h5>
                                        <p className="card-text">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Games;