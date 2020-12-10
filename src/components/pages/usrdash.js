import React, { useState, useContext, useEffect }from "react";
import Nav2 from "../nav/nav2";
import Footer from "../nav/footer";
import UserContext from "../misc/userContext";
import axios from "axios"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { GrAddCircle } from "react-icons/gr";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { AiOutlineOrderedList} from "react-icons/ai";
import { Link } from 'react-router-dom';
import MyVerticallyCenteredModal from "../collex/createCollex";
import "../../CSS/pages/usrdash.css"
import { Card } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import viewAll from "../pages/viewAll";
import jsonData from '../../jsonFiles/userdash.json';

export default function UsrDash() {
    const [modalShow, setModalShow] = useState(false);
    const [playlists, setUserPlaylists] = useState([]);
    const { userData } = useContext(UserContext);
    const [likedPlaylists, setLikedPlaylists] = useState([]);
    const [likedCollex, setLikedCollex] = useState([]);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 7
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userId = userData.user.id ;
            console.log(userId);
            const result = await axios.get(
                `http://localhost:5000/playlist/playlists/${userId}`,
            ); 
            setUserPlaylists(result.data);
            console.log(result.data);
            const likedRes = await axios.get(
                `http://localhost:5000/playlist/likedPlaylists/${userId}`,
            );
            setLikedPlaylists(likedRes.data);
            const likedCollexRes = await axios.get(
                `http://localhost:5000/collex/likedCollex/${userId}`,
            );
            setLikedCollex(likedCollexRes.data);
        };

        fetchData();
    }, []);
    return (
        <>
            <div className="dash-body">

            <Nav2 />    

            <div className="dash-content">
                <h2 className="usrdash-title"> Your Playlists <a href="/createPlaylist" title="Create your own playlist"><GrAddCircle size="20px" /></a></h2>

                {playlists.length!==0 ? 
                    <Carousel className="carousel" responsive={responsive} itemClass="cards">
                        {playlists.map(playlist => (
                            <Card style={{ width: '14rem' }} key={playlist._id} >
                                <Card.Img variant="top" src={playlist.cover} height="200" width="150" />
                                <Card.Body>
                                    <Card.Title><Link style={{ color:"#696969" }} to={`playlist/${playlist._id}`} >{playlist.name}</Link></Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </Carousel>
                    : <h5 style={{ textAlign: "center", marginTop: "3%" }}>You haven't created any playlists. Please click on the add button and create one</h5>}

                {playlists.length > 0 ? <a href="/allPlaylists/viewAll" style={{ float: "right", color:"black" }}> <b>View All Playlists >>></b></a> : <></>}
                <hr className="solid-divider" />
                <h2 className="usrdash-title"> Liked Playlists</h2>
                {likedPlaylists.length !== 0 ?
                    <Carousel className="carousel" responsive={responsive} itemClass="cards">
                        {likedPlaylists.map(playlist => (
                            <Card style={{ width: '14rem' }} key={playlist._id} >
                                <Card.Img variant="top" src={playlist.cover} height="200" width="150"/>
                                <Card.Body>
                                    <Card.Title><Link style={{ color: "#696969" }}  to={`playlist/${playlist._id}`}>{playlist.name}</Link></Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </Carousel>
                    : <h5 style={{ textAlign: "center", marginTop: "3%" }}>You haven't liked any playlists. Please click on the like button when you view a playlist page</h5>}
                    {likedPlaylists.length > 0 ? <a href="/likedPlaylists/viewAll" style={{ float: "right", color: "black" }}> <b>View Liked Playlists >>></b></a> : <></>}

                <hr className="solid-divider" />
                <h2 className="usrdash-title"> Liked Collexs <a title="Create Collex" style={{ cursor: "pointer" }} onClick={() => setModalShow(true)}><GrAddCircle size="20px"/></a>
                    <a title="Explore Collex Gallery" href="/collexDash"><BsFillMusicPlayerFill size="20px" /></a>
                    <a title="Your created Collex" href="/myCollex/viewAll"><AiOutlineOrderedList size="20px" /></a></h2>
                {likedCollex.length !== 0 ?
                    <Carousel className="carousel" responsive={responsive} itemClass="cards">
                        {likedCollex.map(collex => (
                            <Card style={{ width: '14rem'}} key={collex._id} >
                                <Card.Img variant="top" src={collex.cover} height="200" width="150" />
                                <Card.Body >
                                    <Card.Title><Link style={{ color: "#696969" }}  to={`/collex/${collex._id}`} >{collex.name}</Link></Card.Title>
                                </Card.Body>
                            </Card>
                        ))}
                    </Carousel>
                        : <h5 style={{ textAlign: "center", marginTop: "3%" }}>You haven't liked any collex. Please click on the like button when you view a collex page</h5>}
                    {likedCollex.length > 0 ? <a href="/likedCollex/viewAll" style={{ float: "right", color: "black" }}><b> View Liked Collexs >>></b></a> : <></>}
            </div>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    userId={userData.user.id}
                />

                <ToastContainer/>
               
                <Footer />
            </div>
        </>   
    ); 
}
