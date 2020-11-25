import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Nav from '../nav/nav2';
import "../../CSS/collex/collexPage.css"
import Footer from "../nav/footer";
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import { AiFillHeart } from 'react-icons/ai';
import { AiFillPlusCircle } from 'react-icons/ai'
import Comments from "../misc/comments"
import MyVerticallyCenteredModal from "../collex/addPlaylist";


export default function CollexPage() {
    const [modalShow, setModalShow] = useState(false);
    const [data, setData] = useState();
    let parameters = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const collexId = parameters.collexId;
            const result = await axios.get(
                `http://localhost:5000/collex/${collexId}`               
            );
            console.log(result.data.collex);
            setData(result.data.collex);
        };

        fetchData();
    }, []);
    return (
        <>
            <Nav />
                <div>
                    <div className="header">
                        <div >
                        <h1 className="collex-topic">{data ? data.name : <></>}</h1>
                        <a onClick={() => setModalShow(true)} style={{ cursor: "pointer", display: "inline", float: "right", color: "#696969", fontFamily: "roboto, sans-serif", marginTop: "30px", fontSize: "20px" }}>
                                <AiFillPlusCircle style={{ color: "#69b1ec", size: "2em" }} />
                                Add a playlist
                            </a>
                        </div>
                    <div >
                        <p style={{ textAlign: "left", fontStyle: "italic", fontFamily: "roboto, sans-serif", display: "inline", fontSize: "20px" }}>{data ? data.description : <></>}</p>
                            <a href="#" style={{ display: "inline", float: "right", color: "#696969", fontFamily: "roboto, sans-serif", fontSize: "20px" }}>
                                <AiFillHeart style={{ color: "#69b1ec", size: "2em" }} />
                                Like this Collex
                            </a>
                        </div>
                    </div>
                    <hr className="solid" />
                    <div className="playlist-cards">
                        {data && data.playlists.length!=0 ? 
                            data.playlists.map(item => (
                                <Card key={item._id} style={{ width: '13rem' }}>
                                    <Card.Img variant="top" src={item.cover} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Link to={`/playlist/${item._id}`}>View this playlist</Link>
                                    </Card.Body>
                                </Card>     
                            ))
                            : <h5 style={{ textAlign: "center", marginTop: "10%", width: "100%"}}>No Playlists added to the Collex yet. Please click the '+' to add a playlist</h5>
                        }
                        
                    </div>
                    <hr className="solid" />
                    <div className="comment-section">
                        <Comments />
                    </div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                </div>
            <Footer/>
        </>
    );
}