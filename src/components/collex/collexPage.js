import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Nav from '../nav/nav2';
import "../../CSS/collex/collexPage.css"
import Footer from "../nav/footer";

export default function CollexPage() {
    const [data, setData] = useState();
    let parameters = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const collexId = parameters.collexId;
            const result = await axios.get(
                `http://localhost:5000/collex/${collexId}`               
            );
            console.log(result.data);
            setData(result.data);
        };

        fetchData();
    }, []);
    return (
        <>
            <Nav />
            {data ? 
                <div>
                    <h1 className="collex-topic">{data.name}</h1>
                    <p style={{ textAlign: "left", marginLeft: "15%", fontStyle: "italic", fontFamily: "roboto, sans-serif" }}>{data.description}</p>
                    <hr className="solid" />
                    <div style={{ textAlign: "center", fontFamily: "roboto, sans-serif", height: "20%" }}>
                        <h1>This space is for a playlist carousel</h1>
                    </div>
                    <hr className="solid" />
                    <div style={{ textAlign: "center", fontFamily: "roboto, sans-serif", height:"20%" }}>
                        <h1>This space is for comments</h1>
                    </div>
                </div>
                : <h1> No Playlists added to this collex </h1> 
            }
            <Footer/>
        </>
    );
}