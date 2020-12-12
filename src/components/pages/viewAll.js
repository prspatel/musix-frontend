import React, { useState, useContext, useEffect } from "react";
import Nav from '../nav/nav2';
import axios from 'axios';
import Footer from "../nav/footer";
import "../../CSS/pages/viewAll.css";
import UserContext from "../misc/userContext";
import { Link } from 'react-router-dom';
import { Card } from "react-bootstrap";


export default function ViewAll() {
    const [data, setData] = useState([]);
    const { userData } = useContext(UserContext);
    const isLikedPlaylists = window.location.pathname.startsWith("/likedPlaylists");
    const isPlaylists = window.location.pathname.startsWith("/allPlaylist");
    const ismyCollex = window.location.pathname.startsWith("/myCollex");
    const isLikedCollex = window.location.pathname.startsWith("/likedCollex");
    const isCollex = window.location.pathname.startsWith("/allCollex");
    const [playlistOrCollex, setPorC] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const userId = userData.user.id;

            if (isPlaylists) {
                const result = await axios.get(
                    `/api/playlist/playlists/${userId}`,
                );
                setData(result.data);
                setPorC("playlist")
                console.log(data);
            }
            else if (isLikedPlaylists) {
                const result = await axios.get(
                    `/api/playlist/likedPlaylists/${userId}`,
                );
                setData(result.data);
                setPorC("playlist");

            }
            else if (isLikedCollex) {
                const result = await axios.get(
                    `/api/collex/likedCollex/${userId}`,
                );
                setPorC("collex")
                setData(result.data);
                
            }
            else if (ismyCollex) {
                const result = await axios.get(
                    `/api/collex/myCollex/${userId}`,
                );
                setPorC("collex")
                setData(result.data);
            }
            else {
                const result = await axios(
                    '/api/collex/all',
                );
                setData(result.data.collexs);
                setPorC("collex");

            }
        };

        fetchData();
    }, []);
    function displayData() {
        let cards = <h2 style={{ textAlign: "center", fontStyle: "italic", fontFamily: "roboto, sans-serif", marginTop: "12px" }}> You do not have any {playlistOrCollex} </h2>;
        console.log(data);
        if (data.length!=0) {
            cards = data.map((item, id) => {
                return (
                    <Card style={{ width: '14rem', margin: "2%", borderRadius: "24px" }} key={item._id} >
                        <Card.Img variant="top" src={item.cover} height="200" width="150" style={{ borderRadius: "24px"}} />
                        <Card.Body>
                            <Card.Title><Link to={`/${playlistOrCollex}/${item._id}`}>{item.name}</Link></Card.Title>
                            <Card.Text>
                                {item.likes} Likes
                            </Card.Text>
                        </Card.Body>
                        
                    </Card>
                )
            });
        }
        return cards;
    }

    return (
        <>
            <div className="viewall-background">
            <Nav />
            <div className ="viewall-body">
                <div className="viewall-header">
                    <div >
                        <h1 className="viewall-topic">{isLikedPlaylists ? "Your Liked Playlists" : (isPlaylists ? "Your Playlists" : (isLikedCollex ? "Your Liked Collex" : (ismyCollex ? "Your Created Collexs" : "Entire Collex Gallery")))}</h1>
                        </div>
                    <hr className="viewAll-solid" />
                </div>
                <div className="display-cards">
                    {displayData()}
                </div>
            </div>
            <Footer />
            </div>
        </>
    );
}