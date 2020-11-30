import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Nav from '../nav/nav2';
import "../../CSS/collex/collexPage.css"
import Footer from "../nav/footer";
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { AiFillPlusCircle } from 'react-icons/ai'
import Comments from "../misc/comments"
import MyVerticallyCenteredModal from "../collex/addPlaylist";
import { toast, ToastContainer } from 'react-toastify';
import UserContext from "../misc/userContext";


export default function CollexPage() {
    const [modalShow, setModalShow] = useState(false);
    const [data, setData] = useState();
    const [playlists, setPlaylists] = useState([]);
    const [likedbyUser, setlikedbyUser] = useState(false);
    const [likes, setLikes] = useState();
    const { userData, setUserData } = useContext(UserContext);
    const [error, setError] = useState();

    let parameters = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const collexId = parameters.collexId;
            const result = await axios.get(
                `http://localhost:5000/collex/${collexId}`               
            );

            setLikes(result.data.collex.likes);
            setData(result.data.collex);
            setPlaylists(result.data.playlists);

            const userId = userData.user.id;
            const likeresult = await axios.get(
                `http://localhost:5000/collex/likedbyUser/${collexId}/${userId}`
            );
            console.log(likeresult.data);
            setlikedbyUser(likeresult.data);
        };

        fetchData();
    }, []);

    const likeCollex = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const collexId = parameters.collexId;

            var collexLikes = likes;
            collexLikes = collexLikes + 1;
            setLikes(collexLikes);

            /*var userLikes = likesBy;
            userLikes.push(creator_id);
            setLikesBy(userLikes);
            */
            const info = { creator_id, collexId, collexLikes }

            const likeRes = await axios.post(
                "http://localhost:5000/collex/like",
                info
            );
            setlikedbyUser(true);
            toast.success("You liked this collex", {
                position: "bottom-center"
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };
    const dislikeCollex = async (e) => {
        e.preventDefault();
        try {
            const creator_id = userData.user.id;
            const collexId = parameters.collexId;

            var collexLikes = likes;
            collexLikes = collexLikes - 1;
            setLikes(collexLikes);

            /*var userLikes = likesBy;
            userLikes.splice(userLikes.indexOf(creator_id), 1);
            setLikesBy(userLikes);*/

            const info = { creator_id, collexId, collexLikes }

            const likeRes = await axios.post(
                "http://localhost:5000/collex/dislike",
                info
            );

            setlikedbyUser(false);
            toast.error("You disliked this collex", {
                position: "bottom-center"
            })
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

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
                            
                        {
                            likedbyUser ?
                                <a onClick={dislikeCollex} style={{ cursor: "pointer", display: "inline", float: "right", color: "#696969", fontFamily: "roboto, sans-serif", fontSize: "20px" }} title="Unlike this collex">
                                    <AiFillDislike style={{ color: "#69b1ec", size: "2em" }} onMouseOver={({ target }) => target.style.color = "black"} onMouseOut={({ target }) => target.style.color = "#69b1ec"} />{ likes} likes</a>
                                :
                                <a onClick={likeCollex} style={{ cursor: "pointer", display: "inline", float: "right", color: "#696969", fontFamily: "roboto, sans-serif", fontSize: "20px" }} title="Like the collex">
                                    <AiFillLike style={{ color: "#69b1ec", size: "2em" }} onMouseOver={({ target }) => target.style.color = "black"} onMouseOut={({ target }) => target.style.color = "#69b1ec"} />{likes} likes</a>
                        }
                        </div>
                    </div>
                <hr className="solid" />
                <div className = "cards-section">
                    <div className="playlist-cards">
                         {playlists && playlists.length!=0 ? 
                            playlists.map(item => (
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
                </div>
                    <hr className="solid" />
                    <div className="comment-section">
                        <Comments />
                    </div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    collexid={parameters.collexId}
                />
                <ToastContainer />
                </div>
            <Footer/>
        </>
    );
}